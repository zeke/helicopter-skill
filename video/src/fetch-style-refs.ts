import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { STYLE_REFS_DIR } from "../segments.ts";

const SERP_API_KEY = process.env.SERP_API_KEY;
if (!SERP_API_KEY) throw new Error("SERP_API_KEY not set");

const QUERIES = [
  "Asteroid City Wes Anderson 2023 film still desert",
  "Asteroid City Wes Anderson cinematography pastel color palette",
  "Asteroid City 2023 movie scene Jason Schwartzman desert",
];

interface SerpImageResult {
  original: string;
  title: string;
}

async function searchImages(query: string): Promise<SerpImageResult[]> {
  const url = new URL("https://serpapi.com/search");
  url.searchParams.set("engine", "google_images");
  url.searchParams.set("q", query);
  url.searchParams.set("api_key", SERP_API_KEY!);
  url.searchParams.set("num", "5");
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`SERP API error: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { images_results?: SerpImageResult[] };
  return data.images_results ?? [];
}

async function downloadImage(url: string, outPath: string): Promise<boolean> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return false;
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.startsWith("image/")) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 10_000) return false; // skip tiny/broken images
    writeFileSync(outPath, buf);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  mkdirSync(STYLE_REFS_DIR, { recursive: true });

  let count = 0;
  const seen = new Set<string>();

  for (const query of QUERIES) {
    if (count >= 5) break;
    console.log(`searching: "${query}"`);
    const results = await searchImages(query);
    for (const r of results) {
      if (count >= 5) break;
      if (seen.has(r.original)) continue;
      seen.add(r.original);
      const outPath = join(STYLE_REFS_DIR, `${count + 1}.jpg`);
      process.stdout.write(`  downloading ${r.original.slice(0, 80)}... `);
      const ok = await downloadImage(r.original, outPath);
      if (ok) {
        count++;
        console.log(`saved → ${outPath}`);
      } else {
        console.log("skipped");
      }
    }
  }

  console.log(`\n${count} style reference images saved to ${STYLE_REFS_DIR}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
