import { readFileSync, writeFileSync } from "fs";

const API_URL = "https://api.replicate.com/v1";
const POLL_INTERVAL_MS = 4_000;
const POLL_MAX_WAIT_MS = 600_000;

export function getToken(): string {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error("REPLICATE_API_TOKEN not set");
  return token;
}

function authHeaders(): Record<string, string> {
  return { Authorization: `Bearer ${getToken()}` };
}

function jsonHeaders(): Record<string, string> {
  return { ...authHeaders(), "Content-Type": "application/json" };
}

export async function uploadFile(filePath: string): Promise<string> {
  const buf = readFileSync(filePath);
  const blob = new Blob([buf]);
  const form = new FormData();
  form.append("content", blob, filePath.split("/").pop()!);
  const res = await fetch(`${API_URL}/files`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  if (!res.ok) throw new Error(`upload ${filePath}: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { urls: { get: string } };
  return data.urls.get;
}

export async function createPrediction(
  owner: string,
  model: string,
  input: Record<string, unknown>
): Promise<{ id: string }> {
  const res = await fetch(`${API_URL}/models/${owner}/${model}/predictions`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ input }),
  });
  if (!res.ok) throw new Error(`create prediction ${owner}/${model}: ${res.status} ${await res.text()}`);
  return (await res.json()) as { id: string };
}

export interface PredictionResult {
  id: string;
  status: string;
  output: unknown;
  error: string | null;
  metrics?: { total_time?: number; predict_time?: number };
  urls?: { get: string };
}

export async function pollPrediction(id: string): Promise<PredictionResult> {
  const start = Date.now();
  while (Date.now() - start < POLL_MAX_WAIT_MS) {
    const res = await fetch(`${API_URL}/predictions/${id}`, { headers: authHeaders() });
    if (!res.ok) throw new Error(`poll ${id}: ${res.status}`);
    const data = (await res.json()) as PredictionResult;
    if (data.status === "succeeded") return data;
    if (data.status === "failed" || data.status === "canceled")
      throw new Error(`prediction ${id} ${data.status}: ${data.error ?? "unknown"}`);
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  throw new Error(`prediction ${id} timed out`);
}

export async function downloadFile(url: string, outPath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${url}: ${res.status}`);
  writeFileSync(outPath, Buffer.from(await res.arrayBuffer()));
}

export function log(msg: string) {
  process.stderr.write(`${msg}\n`);
}
