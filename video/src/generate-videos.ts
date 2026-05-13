import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  uploadFile, createPrediction, pollPrediction, downloadFile, log,
} from "./helpers.ts";
import {
  SEGMENTS, VIDEOS_DIR, ZEKEFAKE_DIR, STYLE_REFS_DIR, ZEKE_PHOTOS, Variant,
} from "../segments.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const STATE_PATH = join(ROOT, "data", "state.json");

// ── State ──────────────────────────────────────────────────────────────────

interface VariantState {
  predictionId: string | null;
  status: "pending" | "running" | "succeeded" | "failed";
  startedAt: number | null;
  completedAt: number | null;
  outputFile: string | null;
  error: string | null;
  durationSec: number | null;
  replicateUrl: string | null;
}

interface SegmentState {
  index: number;
  name: string;
  description: string;
  variants: Record<string, VariantState>;
  // for dashboard display
  prompts: Record<string, string>;
  refImages: Record<string, string[]>;
  duration: Record<string, number>;
}

interface AppState {
  startedAt: number;
  updatedAt: number;
  totalPredictions: number;
  running: number;
  succeeded: number;
  failed: number;
  segments: SegmentState[];
}

function initState(): AppState {
  const segStates: SegmentState[] = SEGMENTS.map((seg) => {
    const variants: Record<string, VariantState> = {};
    const prompts: Record<string, string> = {};
    const refImages: Record<string, string[]> = {};
    const duration: Record<string, number> = {};
    for (const v of seg.variants) {
      variants[v.id] = {
        predictionId: null, status: "pending",
        startedAt: null, completedAt: null,
        outputFile: null, error: null,
        durationSec: null, replicateUrl: null,
      };
      prompts[v.id] = v.prompt;
      refImages[v.id] = [
        ...v.referenceImageKeys.map((k) => `assets/zekefake/${ZEKE_PHOTOS[k]}`),
        ...(v.referenceStyleCount > 0
          ? Array.from({ length: v.referenceStyleCount }, (_, i) => `assets/style-refs/${i + 1}.jpg`)
          : []),
      ];
      duration[v.id] = v.duration;
    }
    return { index: seg.index, name: seg.name, description: seg.description, variants, prompts, refImages, duration };
  });

  return {
    startedAt: Date.now(),
    updatedAt: Date.now(),
    totalPredictions: SEGMENTS.reduce((n, s) => n + s.variants.length, 0),
    running: 0, succeeded: 0, failed: 0,
    segments: segStates,
  };
}

let state: AppState;

function saveState() {
  state.updatedAt = Date.now();
  state.running   = state.segments.flatMap((s) => Object.values(s.variants)).filter((v) => v.status === "running").length;
  state.succeeded = state.segments.flatMap((s) => Object.values(s.variants)).filter((v) => v.status === "succeeded").length;
  state.failed    = state.segments.flatMap((s) => Object.values(s.variants)).filter((v) => v.status === "failed").length;
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function setVariantState(segIndex: number, variantId: string, patch: Partial<VariantState>) {
  const seg = state.segments.find((s) => s.index === segIndex)!;
  Object.assign(seg.variants[variantId], patch);
  saveState();
}

// ── Upload helpers ─────────────────────────────────────────────────────────

async function uploadOnce(cache: Map<string, string>, filePath: string): Promise<string> {
  if (cache.has(filePath)) return cache.get(filePath)!;
  const url = await uploadFile(filePath);
  cache.set(filePath, url);
  return url;
}

// ── Generate one variant ───────────────────────────────────────────────────

async function generateVariant(
  seg: typeof SEGMENTS[0],
  variant: Variant,
  uploadCache: Map<string, string>
): Promise<void> {
  const segIdx = seg.index;
  const vid = variant.id;
  const segPrefix = `${String(segIdx).padStart(2, "0")}-${seg.name}-${vid}`;

  setVariantState(segIdx, vid, { status: "running", startedAt: Date.now() });

  try {
    const input: Record<string, unknown> = {
      prompt:          variant.prompt,
      duration:        variant.duration,
      resolution:      "720p",
      aspect_ratio:    "16:9",
      generate_audio:  true,
    };

    // I2V path
    if (variant.useImageInput) {
      const imgUrl = await uploadOnce(uploadCache, variant.useImageInput);
      input.image = imgUrl;
    } else {
      // reference_images: Zeke photos + optional style refs
      const refPaths: string[] = [];
      for (const key of variant.referenceImageKeys) {
        refPaths.push(join(ZEKEFAKE_DIR, ZEKE_PHOTOS[key]));
      }
      for (let i = 0; i < variant.referenceStyleCount; i++) {
        refPaths.push(join(STYLE_REFS_DIR, `${i + 1}.jpg`));
      }
      if (refPaths.length > 0) {
        const urls = await Promise.all(refPaths.map((p) => uploadOnce(uploadCache, p)));
        input.reference_images = urls;
      }
    }

    const pred = await createPrediction("bytedance", "seedance-2.0", input);
    const replicateUrl = `https://replicate.com/p/${pred.id}`;
    setVariantState(segIdx, vid, { predictionId: pred.id, replicateUrl });
    log(`  [${segIdx}${vid}] started → ${pred.id}`);

    const result = await pollPrediction(pred.id);
    const elapsed = result.metrics?.predict_time ?? result.metrics?.total_time ?? null;

    let outputUrl: string;
    if (typeof result.output === "string") {
      outputUrl = result.output;
    } else if (Array.isArray(result.output)) {
      outputUrl = result.output[0] as string;
    } else {
      throw new Error(`unexpected output format: ${JSON.stringify(result.output)}`);
    }

    // Filename includes prediction ID for traceability
    const outFile = join(VIDEOS_DIR, `${segPrefix}-${pred.id}.mp4`);
    await downloadFile(outputUrl, outFile);
    log(`  [${segIdx}${vid}] done (${elapsed?.toFixed(0) ?? "?"}s) → ${outFile}`);

    setVariantState(segIdx, vid, {
      status: "succeeded",
      completedAt: Date.now(),
      outputFile: `data/videos/${outFile.split("/").pop()}`,
      durationSec: elapsed ?? null,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    log(`  [${segIdx}${vid}] FAILED: ${msg}`);
    setVariantState(segIdx, vid, { status: "failed", completedAt: Date.now(), error: msg });
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  mkdirSync(VIDEOS_DIR, { recursive: true });

  // Parse optional segment filter args (1-indexed)
  const args = process.argv.slice(2).map((a) => parseInt(a, 10)).filter((n) => !isNaN(n));

  // Load or init state
  if (existsSync(STATE_PATH) && args.length === 0) {
    log("loading existing state.json...");
    const loaded = JSON.parse(readFileSync(STATE_PATH, "utf-8")) as AppState;
    // Start fresh from current segments, then overlay any previously-succeeded variants
    state = initState();
    for (const newSeg of state.segments) {
      const oldSeg = loaded.segments.find((s) => s.index === newSeg.index);
      if (!oldSeg) continue;
      for (const [vid, newV] of Object.entries(newSeg.variants)) {
        const oldV = oldSeg.variants[vid];
        if (oldV?.status === "succeeded") {
          // Preserve succeeded results
          Object.assign(newV, oldV);
        }
        // running → pending (crash recovery)
        if (newV.status === "running") { newV.status = "pending"; newV.predictionId = null; }
      }
    }
  } else {
    state = initState();
  }
  saveState();

  // Collect work items
  const work: Array<{ seg: typeof SEGMENTS[0]; variant: Variant }> = [];
  for (const seg of SEGMENTS) {
    if (args.length > 0 && !args.includes(seg.index)) continue;
    for (const variant of seg.variants) {
      // Skip already-succeeded unless explicitly re-running
      const existing = state.segments.find((s) => s.index === seg.index)?.variants[variant.id];
      if (existing?.status === "succeeded" && args.length === 0) {
        log(`  [${seg.index}${variant.id}] already succeeded — skipping`);
        continue;
      }
      work.push({ seg, variant });
    }
  }

  log(`\nFiring ${work.length} predictions concurrently...\n`);

  // Shared upload cache so each file is only uploaded once
  const uploadCache = new Map<string, string>();

  // Pre-upload all reference images concurrently
  log("pre-uploading reference images...");
  const allRefPaths = new Set<string>();
  for (const { seg, variant } of work) {
    if (variant.useImageInput && existsSync(variant.useImageInput)) {
      allRefPaths.add(variant.useImageInput);
    }
    for (const key of variant.referenceImageKeys) {
      allRefPaths.add(join(ZEKEFAKE_DIR, ZEKE_PHOTOS[key]));
    }
    for (let i = 0; i < variant.referenceStyleCount; i++) {
      allRefPaths.add(join(STYLE_REFS_DIR, `${i + 1}.jpg`));
    }
  }
  await Promise.all([...allRefPaths].map(async (p) => {
    if (!existsSync(p)) { log(`  WARNING: file not found: ${p}`); return; }
    const url = await uploadOnce(uploadCache, p);
    log(`  uploaded: ${p.split("/").pop()} → ${url.slice(0, 60)}...`);
  }));
  log("all reference images uploaded\n");

  // Fire all predictions concurrently
  await Promise.all(work.map(({ seg, variant }) => generateVariant(seg, variant, uploadCache)));

  const { succeeded, failed, totalPredictions } = state;
  log(`\n────────────────────────────────`);
  log(`done: ${succeeded}/${totalPredictions} succeeded, ${failed} failed`);
  log(`state → ${STATE_PATH}`);
  log(`videos → ${VIDEOS_DIR}`);
}

main().catch((e) => { log(`FATAL: ${e}`); process.exit(1); });
