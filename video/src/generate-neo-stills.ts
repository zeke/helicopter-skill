/**
 * Generates Neo stills for seg 1, borrowing exact parameters from the successful
 * 07-walk.jpg (style ref 2 + ziki, wide-medium, full body, desert airstrip aesthetic).
 * Multiple compositions to give options for I2V.
 */
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { uploadFile, createPrediction, pollPrediction, downloadFile, log } from "./helpers.ts";
import { STYLE_REFS_DIR, IMAGES_DIR, ZEKEFAKE_DIR, ZEKE_PHOTOS } from "../segments.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Same STYLE as original generate-images.ts — this is what made the walk/tank stills great
const STYLE = `Wes Anderson Asteroid City (2023) film aesthetic. Dead-center symmetric framing. Pastel color palette: sandy ochre desert ground, turquoise sky, crisp white buildings, muted terracotta. Flat bright daylight, soft shadows, 35mm film grain. Theatrical, surreal, 1950s American Southwest Americana. No subtitles. No text overlays.`;

const ZEKE = `a man with curly gray-brown hair, a short beard, and clear-framed glasses`;

const stills = [
  {
    filename: "01-neo-v2-a.jpg",
    desc: "Wide shot, desert plain, looking sideways, full body — like 07-walk.jpg framing",
    prompt: `${STYLE}

Medium-wide shot. ${ZEKE} in a slim black 1950s flight jacket stands on a sun-bleached desert airstrip tarmac, viewed from straight ahead. Dead-center symmetric composition. He faces slightly to the right, looking off into the middle distance with calm, focused curiosity — as if watching something in the distance. Full figure from boots to head. Sandy ochre tarmac, turquoise sky, red mesa buttes on the horizon. Warm flat daylight. No helicopter in frame.`,
  },
  {
    filename: "01-neo-v2-b.jpg",
    desc: "Medium shot, leaning on a pale 1950s car, looking into distance",
    prompt: `${STYLE}

Medium shot. ${ZEKE} in a slim black 1950s flight jacket leans with one hand on the hood of a dusty pale cream 1950s automobile. He looks off to the side with quiet intensity, squinting slightly into the bright desert light. Sandy ochre desert road behind him. Red mesa buttes on the horizon. Turquoise sky. Warm flat daylight. No helicopter in frame.`,
  },
  {
    filename: "01-neo-v2-c.jpg",
    desc: "Wide shot, on a low platform/step, looking into distance, arms at sides",
    prompt: `${STYLE}

Medium-wide shot. ${ZEKE} in a slim black 1950s flight jacket stands at the top of a short flight of pale concrete steps outside a small desert building. He faces forward-right, looking calmly off into the distance. Arms at his sides. Sandy ochre surroundings, turquoise sky, pastel stucco wall behind him. Warm flat daylight. No helicopter in frame.`,
  },
  {
    filename: "01-neo-v2-d.jpg",
    desc: "3/4 angle, desert road, jacket open, hand shading eyes",
    prompt: `${STYLE}

Medium shot. ${ZEKE} in an open black 1950s flight jacket stands on a flat desert road. He raises one hand to shade his eyes from the bright sun, looking off into the distance at a 3/4 angle. Behind him: flat sandy desert, a distant mesa, turquoise sky. Warm flat daylight. No helicopter in frame.`,
  },
];

async function main() {
  mkdirSync(IMAGES_DIR, { recursive: true });

  log("uploading style ref 2 (same as 07-walk.jpg)...");
  const styleUrl = await uploadFile(join(STYLE_REFS_DIR, "2.jpg"));
  log("  style-ref 2 uploaded");

  log("uploading ziki ref (same as 07-walk.jpg)...");
  const zikiUrl = await uploadFile(join(ZEKEFAKE_DIR, ZEKE_PHOTOS["ziki"]));
  log("  ziki uploaded");

  log(`\nfiring ${stills.length} still predictions...\n`);

  await Promise.all(stills.map(async (s) => {
    log(`  [${s.filename}] starting — ${s.desc}`);
    const pred = await createPrediction("google", "nano-banana-2", {
      prompt: s.prompt,
      image_input: [styleUrl, zikiUrl],
      aspect_ratio: "16:9",
      output_format: "jpg",
    });
    log(`  [${s.filename}] started → ${pred.id}`);
    const result = await pollPrediction(pred.id);
    const outPath = join(IMAGES_DIR, s.filename);
    await downloadFile(result.output as string, outPath);
    log(`  [${s.filename}] done → ${outPath}`);
  }));

  log("\nAll Neo stills done:");
  for (const s of stills) {
    log(`  data/images/${s.filename}`);
  }
}

main().catch((e) => { console.error(`FATAL: ${e}`); process.exit(1); });
