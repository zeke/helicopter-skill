import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { uploadFile, createPrediction, pollPrediction, downloadFile, log } from "./helpers.ts";
import { STYLE_REFS_DIR, IMAGES_DIR, ZEKEFAKE_DIR, ZEKE_PHOTOS } from "../segments.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_PATH = join(__dirname, "..", "data", "images-state.json");

const STYLE = `Wes Anderson Asteroid City (2023) film aesthetic. Dead-center symmetric framing. Pastel color palette: sandy ochre desert ground, turquoise sky, crisp white buildings, muted terracotta. Flat bright daylight, soft shadows, 35mm film grain. Theatrical, surreal, 1950s American Southwest Americana. No subtitles. No text overlays.`;

const ZEKE = `a man with curly gray-brown hair, a short beard, and clear-framed glasses`;

interface ImageSegment {
  index: number;
  filename: string;
  prompt: string;
  styleRefIndex: number;   // which style ref image to use (1-5)
  zekePhotoKey?: string;   // optional zeke photo for image_input
}

const IMAGE_SEGMENTS: ImageSegment[] = [
  {
    index: 1,
    filename: "01-neo.jpg",
    styleRefIndex: 2,
    zekePhotoKey: "ziki",
    prompt: `${STYLE}

Medium shot. ${ZEKE} dressed in a slim black 1950s flight jacket, standing on a sun-baked desert airstrip rooftop. Sandy ochre ground, turquoise Wes Anderson sky. He stands slightly to the right of center, looking off-screen to the left at something in the distance. Expression of calm curiosity. Warm flat daylight. Film still composition.`,
  },
  {
    index: 2,
    filename: "02-helicopter.jpg",
    styleRefIndex: 1,
    prompt: `${STYLE}

Wide establishing shot. A pristine 1950s Bell 47 bubble-canopy helicopter sits perfectly centered on a sun-bleached desert airstrip tarmac. The helicopter is painted pale turquoise and cream. Dead-center symmetric composition, vanishing point in center. To the left and right: small pastel hangars. In the distance, red mesa buttes. A hand-painted wooden sign in the background reads THE MATRIX in bold yellow letters on a dark board, in the style of the Asteroid City wagon sign. Sandy ochre ground, turquoise sky, saguaro cacti. Not a soul in sight.`,
  },
  {
    index: 3,
    filename: "03-trinity-phone.jpg",
    styleRefIndex: 3,
    zekePhotoKey: "outdoor-selfie",
    prompt: `${STYLE}

Close-up shot. ${ZEKE} dressed as a 1950s aviator: pale linen shirt, slim dark aviator sunglasses pushed halfway down his nose. Warm golden afternoon light. He holds a slim cream-colored Bakelite telephone receiver to his ear with one hand; his other hand holds his sunglasses as if he just removed them. Expression: calm, focused, slightly conspiratorial. Rooftop setting, turquoise sky behind.`,
  },
  {
    index: 4,
    filename: "04-tank-operator.jpg",
    styleRefIndex: 2,
    zekePhotoKey: "wilder-shirt",
    prompt: `${STYLE}

Medium shot. ${ZEKE} seated at a wide vintage 1950s telephone switchboard console. White short-sleeve button-up shirt, suspenders, small headset on one ear. Warm amber interior light. Pastel yellow walls. He holds a telephone handset to his ear and looks up with alert, widened eyes. The console behind him is covered in patch cables, dials, and blinking amber indicator lights. Retro Wes Anderson interior.`,
  },
  {
    index: 5,
    filename: "05-tank-console.jpg",
    styleRefIndex: 1,
    zekePhotoKey: "wilder-shirt",
    prompt: `${STYLE}

Wide-medium shot, slightly from behind and to one side. ${ZEKE} in white short-sleeve button-up with suspenders leans intently over a large 1950s computing console. Multiple small green-glowing CRT monitors arranged symmetrically show rotating wireframe diagrams of a Bell 47 helicopter. Reel-to-reel tape machines on either side. Warm amber and green light. His hands rest on a Bakelite keyboard. The room is tidy and retro. Wes Anderson dead-center framing.`,
  },
  {
    index: 6,
    filename: "06-trinity-upload.jpg",
    styleRefIndex: 3,
    zekePhotoKey: "outdoor-selfie",
    prompt: `${STYLE}

Extreme close-up portrait. ${ZEKE}'s face fills the frame. Eyes closed. Eyelids still. A faint warm golden-amber glow washes across his face from below, pulsing gently. His expression is serene, neutral, focused inward. Soft bokeh background of turquoise and ochre. 35mm film grain. Theatrical stillness. This is the moment before he opens his eyes.`,
  },
  {
    index: 7,
    filename: "07-walk.jpg",
    styleRefIndex: 2,
    zekePhotoKey: "ziki",
    prompt: `${STYLE}

Medium-wide shot. ${ZEKE} in a slim black 1950s flight jacket walks directly toward camera across a sun-bleached desert airstrip tarmac. Dead-center symmetric composition, pulling-back perspective. Behind him in the distance: a pale turquoise Bell 47 bubble-canopy helicopter with slowly spinning rotors. Sandy ochre tarmac, turquoise sky, red mesa buttes in the far background. Confident purposeful stride. Cinematic hero walk, Wes Anderson style.`,
  },
];

interface ImageState {
  [filename: string]: {
    status: "pending" | "running" | "succeeded" | "failed";
    predictionId: string | null;
    outputFile: string | null;
    error: string | null;
    startedAt: number | null;
    completedAt: number | null;
  };
}

function saveState(s: ImageState) {
  writeFileSync(STATE_PATH, JSON.stringify(s, null, 2));
}

async function generateImage(seg: ImageSegment, styleUrls: string[], zekeUrls: Map<string, string>, state: ImageState): Promise<void> {
  const outPath = join(IMAGES_DIR, seg.filename);

  state[seg.filename].status = "running";
  state[seg.filename].startedAt = Date.now();
  saveState(state);

  try {
    const imageInputs: string[] = [styleUrls[seg.styleRefIndex - 1]];
    if (seg.zekePhotoKey && zekeUrls.has(seg.zekePhotoKey)) {
      imageInputs.push(zekeUrls.get(seg.zekePhotoKey)!);
    }

    const pred = await createPrediction("google", "nano-banana-2", {
      prompt: seg.prompt,
      image_input: imageInputs,
      aspect_ratio: "16:9",
      output_format: "jpg",
    });

    state[seg.filename].predictionId = pred.id;
    saveState(state);
    log(`  [${seg.index}] started → ${pred.id}`);

    const result = await pollPrediction(pred.id);
    const outputUrl = result.output as string;
    await downloadFile(outputUrl, outPath);

    state[seg.filename].status = "succeeded";
    state[seg.filename].outputFile = `data/images/${seg.filename}`;
    state[seg.filename].completedAt = Date.now();
    saveState(state);
    log(`  [${seg.index}] done → ${outPath}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    log(`  [${seg.index}] FAILED: ${msg}`);
    state[seg.filename].status = "failed";
    state[seg.filename].error = msg;
    state[seg.filename].completedAt = Date.now();
    saveState(state);
  }
}

async function main() {
  mkdirSync(IMAGES_DIR, { recursive: true });

  // Upload style refs
  log("uploading style reference images...");
  const styleUrls = await Promise.all(
    [1, 2, 3, 4, 5].map(async (i) => {
      const p = join(STYLE_REFS_DIR, `${i}.jpg`);
      const url = await uploadFile(p);
      log(`  style-ref ${i} uploaded`);
      return url;
    })
  );

  // Upload unique zeke photos
  log("uploading zeke reference photos...");
  const zekeKeys = [...new Set(IMAGE_SEGMENTS.filter(s => s.zekePhotoKey).map(s => s.zekePhotoKey!))];
  const zekeUrls = new Map<string, string>();
  await Promise.all(zekeKeys.map(async (key) => {
    const p = join(ZEKEFAKE_DIR, ZEKE_PHOTOS[key]);
    const url = await uploadFile(p);
    zekeUrls.set(key, url);
    log(`  zeke/${key} uploaded`);
  }));

  const state: ImageState = {};
  for (const seg of IMAGE_SEGMENTS) {
    state[seg.filename] = { status: "pending", predictionId: null, outputFile: null, error: null, startedAt: null, completedAt: null };
  }
  saveState(state);

  log(`\nfiring ${IMAGE_SEGMENTS.length} predictions concurrently...\n`);

  await Promise.all(IMAGE_SEGMENTS.map(seg => generateImage(seg, styleUrls, zekeUrls, state)));

  const done = Object.values(state).filter(v => v.status === "succeeded").length;
  const failed = Object.values(state).filter(v => v.status === "failed").length;
  log(`\ndone: ${done}/${IMAGE_SEGMENTS.length} succeeded, ${failed} failed`);
  log(`images → ${IMAGES_DIR}`);
}

main().catch((e) => { log(`FATAL: ${e}`); process.exit(1); });
