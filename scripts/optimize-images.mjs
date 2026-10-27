// Shrinks every photo in src/assets/menu/items (and the category covers) so the
// menu loads fast on phones. Run it with:  npm run optimize
// Photos are resized to max 900px wide and saved as .webp (same file name).
import sharp from "sharp";
import { readdir, stat, unlink, rename } from "node:fs/promises";
import path from "node:path";

const dirs = ["src/assets/menu/items", "src/assets/menu"];
const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
let saved = 0;

for (const dir of dirs) {
  let files = [];
  try { files = await readdir(dir); } catch { continue; }
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (!exts.has(ext)) continue;
    const src = path.join(dir, f);
    if (!(await stat(src)).isFile()) continue;
    const before = (await stat(src)).size;
    const out = path.join(dir, path.basename(f, path.extname(f)) + ".webp");
    const tmp = out + ".tmp";
    await sharp(src).rotate().resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 78 }).toFile(tmp);
    const after = (await stat(tmp)).size;
    if (after >= before && ext === ".webp") { await unlink(tmp); continue; }
    if (src !== out) await unlink(src);
    await rename(tmp, out);
    saved += before - after;
    console.log(`${f}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
  }
}
console.log(`Done. Saved ${(saved / 1024 / 1024).toFixed(1)} MB.`);
