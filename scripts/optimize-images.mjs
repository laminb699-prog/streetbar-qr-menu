// Shrinks every photo in src/assets/menu/items (and the category covers) so the
// menu loads fast on phones. Run it with:  npm run optimize
// Photos are resized to max 900px wide and saved as .webp (same file name).
// A problem with one photo never stops the others.
import sharp from "sharp";
import { readdir, readFile, writeFile, unlink, stat } from "node:fs/promises";
import path from "node:path";

const dirs = ["src/assets/menu/items", "src/assets/menu"];
const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
let saved = 0;
let failed = 0;

for (const dir of dirs) {
  let files = [];
  try { files = await readdir(dir); } catch { continue; }

  // Clean up leftovers from an earlier interrupted run.
  for (const f of files) {
    if (f.endsWith(".tmp")) {
      try { await unlink(path.join(dir, f)); console.log(`Removed leftover ${f}`); } catch {}
    }
  }

  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (!exts.has(ext)) continue;
    const src = path.join(dir, f);
    try {
      if (!(await stat(src)).isFile()) continue;
      const input = await readFile(src);
      const output = await sharp(input).rotate()
        .resize({ width: 900, withoutEnlargement: true })
        .webp({ quality: 78 }).toBuffer();
      if (ext === ".webp" && output.length >= input.length) continue; // already small
      const out = path.join(dir, path.basename(f, path.extname(f)) + ".webp");
      await writeFile(out, output);
      if (out !== src) await unlink(src);
      saved += input.length - output.length;
      console.log(`${f}: ${(input.length / 1024).toFixed(0)} KB -> ${(output.length / 1024).toFixed(0)} KB`);
    } catch (err) {
      failed++;
      console.log(`SKIPPED ${f}: ${err.message}`);
    }
  }
}
console.log(`Done. Saved ${(saved / 1024 / 1024).toFixed(1)} MB.${failed ? ` ${failed} file(s) skipped, see above.` : ""}`);
