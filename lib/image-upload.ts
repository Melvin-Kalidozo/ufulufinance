import sharp from "sharp";

// Server-side image pipeline: validate → resize → re-encode (WebP) → return a
// compact buffer ready for Cloudinary. Documents (CVs) are validated separately.

export const MAX_IMAGE_RAW_MB = 8; // reject anything larger than 8 MB up front
export const MAX_IMAGE_W = 1920;
export const MAX_IMAGE_H = 1920;
export const IMAGE_QUALITY = 80;

export const ALLOWED_IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp"];

export const ALLOWED_DOC_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const MAX_DOC_MB = 5;

export type OptimizedImage = { buffer: Buffer; mime: "image/webp"; ext: string };

export class UploadError extends Error {}

function mimeOf(file: File): string {
  return (file.type || "").toLowerCase();
}

/** Generic size guard shared by images and documents. */
export function assertFileSize(file: File, maxMb: number, label = "file") {
  if (file.size <= 0) throw new UploadError("The selected file is empty.");
  if (file.size > maxMb * 1024 * 1024) {
    throw new UploadError(`${label} must be ${maxMb} MB or smaller.`);
  }
}

/**
 * Validates and optimizes an uploaded image:
 * - type must be in ALLOWED_IMAGE_MIMES
 * - raw size must be <= MAX_IMAGE_RAW_MB
 * - resized so the longest side <= MAX_IMAGE_W/MAX_IMAGE_H
 * - re-encoded to WebP @ IMAGE_QUALITY
 */
export async function optimizeImage(file: File): Promise<OptimizedImage> {
  const mime = mimeOf(file);
  if (!ALLOWED_IMAGE_MIMES.includes(mime)) {
    throw new UploadError("Only JPG, PNG or WebP images are allowed.");
  }
  assertFileSize(file, MAX_IMAGE_RAW_MB, "Image");

  let buffer = Buffer.from(await file.arrayBuffer());
  let pipeline = sharp(buffer, { failOn: "none" }).rotate();

  const meta = await pipeline.metadata().catch(() => null);
  if (meta && meta.width && (meta.width > MAX_IMAGE_W || (meta.height ?? 0) > MAX_IMAGE_H)) {
    pipeline = pipeline.resize(MAX_IMAGE_W, MAX_IMAGE_H, { fit: "inside", withoutEnlargement: true });
  }

  buffer = await pipeline.webp({ quality: IMAGE_QUALITY }).toBuffer();
  return { buffer, mime: "image/webp", ext: "webp" };
}

/** Validates a CV/document upload (PDF, DOC, DOCX) and returns its raw buffer. */
export async function readDocument(file: File): Promise<Buffer> {
  const mime = mimeOf(file);
  if (!ALLOWED_DOC_MIMES.includes(mime) && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new UploadError("CV must be a PDF, DOC or DOCX file.");
  }
  assertFileSize(file, MAX_DOC_MB, "CV");
  return Buffer.from(await file.arrayBuffer());
}

export type UploadFolder =
  | "loan-products"
  | "services"
  | "articles"
  | "events"
  | "jobs"
  | "governance"
  | "impact"
  | "testimonials"
  | "settings"
  | "media"
  | "cvs";
