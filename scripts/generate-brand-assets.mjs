/**
 * Generate brand/SEO image assets from public/logo.png.
 *
 * Run with:  node scripts/generate-brand-assets.mjs
 *
 * Outputs (into /public):
 *   - og-image.png   1200x630  default Open Graph / Twitter share card
 *   - og-square.png  1200x1200 square share card
 *   - icon-512.png   512x512   PWA / favicon
 *   - icon-192.png   192x192   PWA / favicon
 *   - apple-icon.png 180x180   iOS home-screen icon
 */
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");
const LOGO = join(PUBLIC_DIR, "logo.png");

// Emblem (circular mark) bounds inside the logo, measured from the source file.
const EMBLEM = { left: 246, top: 15, width: 157, height: 157 };

const BRAND_BLUE = "#034DA2";
const BRAND_SKY = "#009FE0";
const BRAND_GREEN = "#199D8E";

function backgroundSvg(width, height, barHeight) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="${BRAND_BLUE}"/>
          <stop offset="0.5" stop-color="${BRAND_SKY}"/>
          <stop offset="1" stop-color="${BRAND_GREEN}"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#ffffff"/>
      <rect x="0" y="${height - barHeight}" width="${width}" height="${barHeight}" fill="url(#accent)"/>
    </svg>`
  );
}

async function buildShareCard({ width, height, barHeight, logoWidth }) {
  const logo = await sharp(LOGO).resize({ width: logoWidth }).png().toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const left = Math.round((width - logoMeta.width) / 2);
  const top = Math.round((height - barHeight - logoMeta.height) / 2);

  return sharp(backgroundSvg(width, height, barHeight))
    .composite([{ input: logo, left, top }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function buildIcon(size) {
  const pad = Math.round(size * 0.14);
  const inner = size - pad * 2;
  const emblem = await sharp(LOGO)
    .extract(EMBLEM)
    .resize(inner, inner, { fit: "contain", background: "#ffffff" })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: "#ffffff",
    },
  })
    .composite([{ input: emblem, left: pad, top: pad }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function emit(relPath, buffer) {
  const out = join(PUBLIC_DIR, relPath);
  await writeFile(out, buffer);
  const kb = (buffer.length / 1024).toFixed(1);
  console.log(`  ${relPath.padEnd(16)} ${kb} KB`);
  return { relPath, bytes: buffer.length };
}

/** Pack PNG frames into a multi-size .ico (PNG-compressed ICO, supported by modern browsers). */
async function buildIco(sizes) {
  const pngs = [];
  for (const size of sizes) pngs.push(await buildIcon(size));

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);

  const entries = [];
  let offset = 6 + sizes.length * 16;
  for (let i = 0; i < sizes.length; i++) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0); // width
    entry.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(pngs[i].length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    entries.push(entry);
    offset += pngs[i].length;
  }

  return Buffer.concat([header, ...entries, ...pngs]);
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });
  console.log("Generating brand assets from public/logo.png ...");

  const outputs = [];
  outputs.push(
    await emit("og-image.png", await buildShareCard({ width: 1200, height: 630, barHeight: 14, logoWidth: 760 }))
  );
  outputs.push(
    await emit("og-square.png", await buildShareCard({ width: 1200, height: 1200, barHeight: 16, logoWidth: 820 }))
  );
  outputs.push(await emit("icon-512.png", await buildIcon(512)));
  outputs.push(await emit("icon-192.png", await buildIcon(192)));
  outputs.push(await emit("apple-icon.png", await buildIcon(180)));

  // Multi-size favicon written to the Next.js app directory convention.
  const favicon = await buildIco([16, 32, 48]);
  await writeFile(join(ROOT, "app", "favicon.ico"), favicon);
  console.log(`  app/favicon.ico   ${(favicon.length / 1024).toFixed(1)} KB`);

  const OG_LIMIT = 8 * 1024 * 1024;
  const TWITTER_LIMIT = 5 * 1024 * 1024;
  for (const { relPath, bytes } of outputs) {
    if (relPath.endsWith("og-image.png") && bytes > OG_LIMIT) {
      throw new Error(`${relPath} exceeds the 8MB Open Graph limit`);
    }
    if (bytes > TWITTER_LIMIT) {
      throw new Error(`${relPath} exceeds the 5MB Twitter image limit`);
    }
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
