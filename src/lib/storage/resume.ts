import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export function resumeMaxBytes() {
  const fallback = 4_000_000;
  const parsed = Number(process.env.RESUME_MAX_BYTES ?? fallback);
  if (!Number.isFinite(parsed) || parsed < 20_000 || parsed > 10_000_000) return fallback;
  return Math.floor(parsed);
}

export function storageDirectory() {
  const configured = process.env.RESUME_STORAGE_DIR;
  const resolved = configured
    ? path.resolve(configured)
    : path.join(process.cwd(), "storage", "resumes");
  const publicDirectory = path.resolve(process.cwd(), "public");
  if (resolved === publicDirectory || resolved.startsWith(publicDirectory + path.sep)) {
    throw new Error("Resume storage must not be inside the public directory.");
  }
  return resolved;
}

export function assertPdf(file: File, maxBytes: number) {
  const name = file.name || "resume.pdf";
  if (!name.toLowerCase().endsWith(".pdf")) {
    return "Attach a PDF resume. Other file types are not accepted.";
  }
  if (file.type && file.type !== "application/pdf") {
    return "Attach a PDF resume. Other file types are not accepted.";
  }
  if (file.size <= 0) return "The resume file is empty.";
  if (file.size > maxBytes) {
    return `The resume must be ${Math.floor(maxBytes / 1_000_000)} MB or smaller.`;
  }
  return null;
}

export async function readVerifiedPdf(file: File, maxBytes: number) {
  const message = assertPdf(file, maxBytes);
  if (message) return { ok: false as const, error: message };
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > maxBytes) {
    return { ok: false as const, error: `The resume must be ${Math.floor(maxBytes / 1_000_000)} MB or smaller.` };
  }
  if (!bytes.subarray(0, 5).toString("utf8").startsWith("%PDF-")) {
    return { ok: false as const, error: "The file is not a valid PDF." };
  }
  const originalName = path.basename(file.name).replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 80);
  return {
    ok: true as const,
    bytes,
    filename: originalName.toLowerCase().endsWith(".pdf") ? originalName : "resume.pdf",
  };
}

export async function storeResume(bytes: Buffer, originalName: string) {
  const directory = storageDirectory();
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const id = randomUUID();
  const target = path.join(directory, `${id}.pdf`);
  await writeFile(target, bytes, { mode: 0o600 });
  await writeFile(
    path.join(directory, `${id}.json`),
    JSON.stringify({ id, originalName, bytes: bytes.length, storedAt: new Date().toISOString() }),
    { mode: 0o600 },
  );
  return id;
}

export async function deleteResume(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return;
  const directory = storageDirectory();
  await rm(path.join(directory, `${id}.pdf`), { force: true });
  await rm(path.join(directory, `${id}.json`), { force: true });
}
