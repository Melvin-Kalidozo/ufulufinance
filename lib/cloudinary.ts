import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Cloudinary is configured server-side only (makaztech pattern).
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type UploadedAsset = {
  secureUrl: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
};

function uploadStream(buffer: Buffer, options: Record<string, unknown>): Promise<UploadedAsset> {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: "auto", ...options },
      (error, result) => {
        if (error) return reject(error);
        const r = result!;
        resolve({
          secureUrl: r.secure_url,
          publicId: r.public_id,
          width: r.width,
          height: r.height,
          format: r.format,
          bytes: r.bytes,
        });
      }
    );
    Readable.from(buffer).pipe(upload);
  });
}

/** Uploads an already-buffered asset (image, CV, document) to a Cloudinary folder. */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder = "ufulu",
  extra: { publicId?: string; format?: string; resourceType?: string } = {}
): Promise<UploadedAsset> {
  return uploadStream(buffer, {
    folder,
    ...(extra.publicId ? { public_id: extra.publicId } : {}),
    ...(extra.resourceType ? { resource_type: extra.resourceType } : {}),
  });
}

/** Uploads a raw File/Blob (compat helper mirroring makaztech's uploadToCloudinary). */
export async function uploadToCloudinary(file: File | Blob, folder = "ufulu") {
  if (!file || !(file instanceof Blob)) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await uploadStream(buffer, { folder });
  return asset.secureUrl;
}

/** Removes an asset. resourceType must match how it was uploaded ("image" | "raw" | ...). */
export async function deleteCloudinaryAsset(
  publicId: string,
  resourceType: "image" | "raw" | "video" | "auto" = "image"
) {
  if (!publicId) return null;
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { resource_type: resourceType }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

/** Best-effort: turns a stored Cloudinary URL into its public_id (folder/name). */
export function publicIdFromUrl(url: string | null | undefined, folder: string): string | null {
  if (!url) return null;
  // https://res.cloudinary.com/<cloud>/<something>/<type>/upload/v1/<folder>/<file>
  const marker = `/upload/v1/${folder}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  const file = url.slice(idx + marker.length).split("?")[0].replace(/\.[a-z0-9]+$/i, "");
  return `${folder}/${file}`;
}
