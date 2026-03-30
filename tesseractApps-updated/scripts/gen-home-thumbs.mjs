/**
 * gen-home-thumbs.mjs
 * Generates optimised thumbnail variants for home-page images.
 * Run automatically via `prebuild` in package.json.
 *
 * Outputs go to src/assets/thumbs/ — import those in components instead of originals.
 */

import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// sharp is a devDependency — not installed in Vercel/AWS production builds.
// Thumbs are committed to git so this script is a no-op when sharp is absent.
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.log("gen-home-thumbs: sharp not available, skipping (thumbs are pre-committed).");
  process.exit(0);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, "../src/assets");
const thumbsDir = join(assetsDir, "thumbs");

if (!existsSync(thumbsDir)) mkdirSync(thumbsDir, { recursive: true });

const jobs = [
  // Blog card images — displayed at ~400×210px (object-fit: cover)
  { src: "blog1.webp",         out: "blog1-thumb.webp",         width: 800, height: 420 },
  { src: "blog2.webp",         out: "blog2-thumb.webp",         width: 800, height: 420 },
  { src: "blog3.webp",         out: "blog3-thumb.webp",         width: 800, height: 420 },
  { src: "Blog5Image3.webp",   out: "Blog5Image3-thumb.webp",   width: 800, height: 420 },
  { src: "expo-canberra1.webp",out: "expo-canberra1-thumb.webp",width: 800, height: 420 },
  { src: "MelbourneExpo.webp", out: "MelbourneExpo-thumb.webp", width: 800, height: 420 },

  // Author avatar — displayed at 45×45px
  { src: "BELLE BAI - MARKETING EXECUTIVE.webp", out: "author-belle-thumb.webp", width: 90, height: 90 },

  // Client logos — displayed at height 120px, object-fit: contain
  { src: "ANA Logo.webp",               out: "ANA Logo-thumb.webp",               width: 400, height: 240, fit: "inside" },
  { src: "FRAMILY VENTURES Final.webp", out: "FRAMILY VENTURES Final-thumb.webp", width: 400, height: 240, fit: "inside" },
  { src: "NEXUS Final.webp",            out: "NEXUS Final-thumb.webp",            width: 400, height: 240, fit: "inside" },
  { src: "PINNACLE Final.webp",         out: "PINNACLE Final-thumb.webp",         width: 400, height: 240, fit: "inside" },
  { src: "company-2.webp",              out: "company-2-thumb.webp",              width: 400, height: 240, fit: "inside" },
  { src: "company-4.webp",              out: "company-4-thumb.webp",              width: 400, height: 240, fit: "inside" },
  { src: "company-5.webp",              out: "company-5-thumb.webp",              width: 400, height: 240, fit: "inside" },
  { src: "logo13.webp",                 out: "logo13-thumb.webp",                 width: 400, height: 240, fit: "inside" },
  { src: "Blessing Care and Support Pty Ltd.webp",  out: "Blessing Care-thumb.webp",  width: 400, height: 240, fit: "inside" },
  { src: "Clear Choice Clinic Pty Ltd.webp",        out: "Clear Choice-thumb.webp",   width: 400, height: 240, fit: "inside" },
  { src: "ImprovedAbility.webp",                    out: "ImprovedAbility-thumb.webp",width: 400, height: 240, fit: "inside" },
  { src: "RCG-Logo_2[12038376].webp",               out: "RCG-Logo-thumb.webp",       width: 400, height: 240, fit: "inside" },
  { src: "Company-YDCS-.webp",                      out: "Company-YDCS-thumb.webp",   width: 400, height: 240, fit: "inside" },
  { src: "KS PNG Logo.webp",                      out: "KS PNG Logo.webp",   width: 400, height: 240, fit: "inside" },
  { src: "embrace logo.webp",                      out: "embrace logo.webp",   width: 400, height: 240, fit: "inside" },
  { src: "AveryCareLogo.webp",                      out: "AveryCareLogo.webp",   width: 400, height: 240, fit: "inside" },
];

let generated = 0;
let skipped = 0;

for (const job of jobs) {
  const srcPath = join(assetsDir, job.src);
  const outPath = join(thumbsDir, job.out);

  if (!existsSync(srcPath)) {
    console.warn(`  [skip] source not found: ${job.src}`);
    skipped++;
    continue;
  }

  // Skip regenerating if thumb is newer than source
  if (existsSync(outPath)) {
    const { mtimeMs: srcMtime } = await import("fs").then(fs => fs.promises.stat(srcPath));
    const { mtimeMs: outMtime } = await import("fs").then(fs => fs.promises.stat(outPath));
    if (outMtime >= srcMtime) {
      skipped++;
      continue;
    }
  }

  const resizeOpts = job.fit === "inside"
    ? { width: job.width, height: job.height, fit: "inside", withoutEnlargement: true }
    : { width: job.width, height: job.height, fit: "cover", position: "centre" };

  await sharp(srcPath)
    .resize(resizeOpts)
    .webp({ quality: 82 })
    .toFile(outPath);

  generated++;
  console.log(`  [ok] ${job.out}`);
}

console.log(`gen-home-thumbs: ${generated} generated, ${skipped} skipped.`);
