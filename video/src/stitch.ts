import { writeFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { VIDEOS_DIR } from "../segments.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT = join(ROOT, "data", "output.mp4");
const CONCAT_LIST = join(ROOT, "data", "concat.txt");

// Segments in order — pick -a first, fall back to -b
const SEGMENT_NAMES = [
  "01-neo",
  "02-helicopter",
  "03-trinity-phone",
  "04-tank-operator",
  "05-tank-console",
  "06-trinity-upload",
  "07-walk",
];

function pickBest(name: string): string | null {
  for (const variant of ["a", "b"]) {
    const p = join(VIDEOS_DIR, `${name}-${variant}.mp4`);
    if (existsSync(p)) return p;
  }
  // Also handle seg 2 which only has -a
  const p = join(VIDEOS_DIR, `${name}-a.mp4`);
  if (existsSync(p)) return p;
  return null;
}

function main() {
  const picks: string[] = [];
  for (const name of SEGMENT_NAMES) {
    const p = pickBest(name);
    if (!p) {
      console.warn(`WARNING: no video found for ${name} — skipping`);
      continue;
    }
    picks.push(p);
    console.log(`  ${name} → ${p}`);
  }

  if (picks.length === 0) {
    console.error("No video segments found. Run npm run videos first.");
    process.exit(1);
  }

  const listContent = picks.map((p) => `file '${p}'`).join("\n");
  writeFileSync(CONCAT_LIST, listContent);
  console.log(`\nStitching ${picks.length} segments → ${OUTPUT}`);

  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${CONCAT_LIST}" -c copy "${OUTPUT}"`,
    { stdio: "inherit" }
  );

  console.log(`\nDone → ${OUTPUT}`);
}

main();
