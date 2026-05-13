import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFileSync, existsSync, watch } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PORT = 3000;

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".json": "application/json",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".mp4":  "video/mp4",
  ".mp3":  "audio/mpeg",
  ".css":  "text/css",
};

// SSE clients
const clients = new Set<ServerResponse>();

function broadcast(event: string, data: string) {
  const msg = `event: ${event}\ndata: ${data}\n\n`;
  for (const c of clients) {
    try { c.write(msg); } catch { clients.delete(c); }
  }
}

// Watch data/ for any changes → push SSE update
const DATA_DIR = join(ROOT, "data");
try {
  watch(DATA_DIR, { recursive: true }, (_evt, filename) => {
    if (filename) broadcast("update", JSON.stringify({ file: filename, ts: Date.now() }));
  });
} catch {
  // data/ may not exist yet at startup — that's fine
}

// Also watch assets/ for style-refs
const ASSETS_DIR = join(ROOT, "assets", "style-refs");
try {
  watch(ASSETS_DIR, { recursive: true }, (_evt, filename) => {
    if (filename) broadcast("update", JSON.stringify({ file: `style-refs/${filename}`, ts: Date.now() }));
  });
} catch {}

function serveFile(filePath: string, res: ServerResponse) {
  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = extname(filePath).toLowerCase();
  const mime = MIME[ext] ?? "application/octet-stream";

  // Range support for video
  res.writeHead(200, { "Content-Type": mime });
  res.end(readFileSync(filePath));
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // SSE endpoint
  if (pathname === "/events") {
    res.writeHead(200, {
      "Content-Type":  "text/event-stream",
      "Cache-Control": "no-cache",
      Connection:      "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    res.write("retry: 2000\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  // Map URL paths to filesystem paths
  let filePath: string;
  if (pathname === "/" || pathname === "/index.html") {
    filePath = join(ROOT, "index.html");
  } else if (pathname.startsWith("/data/")) {
    filePath = join(ROOT, pathname.slice(1));
  } else if (pathname.startsWith("/assets/")) {
    filePath = join(ROOT, pathname.slice(1));
  } else {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  serveFile(filePath, res);
});

server.listen(PORT, () => {
  console.log(`\nDashboard → http://localhost:${PORT}\n`);
});
