// Automatically picks up every image placed anywhere under src/assets/menu/
// (both the category cover photos directly in that folder, and the
// per-item photos in src/assets/menu/items/). To add or replace any photo,
// just save a file with the right base name into the right folder — the
// extension doesn't need to match exactly (.jpg, .jpeg, .png, .webp all
// work). If no matching file is found, the fallback passed in is used
// instead, so a missing or misnamed file can never break the build.

const photoModules = import.meta.glob(
  "../assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
) as Record<string, string>;

function stripExtension(filename: string): string {
  return filename.replace(/\.[a-zA-Z0-9]+$/, "");
}

const byBaseName = new Map<string, string>();
for (const path in photoModules) {
  const filename = path.split("/").pop() ?? "";
  const base = stripExtension(filename).toLowerCase();
  byBaseName.set(base, photoModules[path]);
}

export function resolveItemImage(filename: string, fallback: string): string {
  const base = stripExtension(filename).toLowerCase();
  return byBaseName.get(base) ?? fallback;
}

export function getFolderImages(folderName: string): string[] {
  const matches = Object.keys(photoModules)
    .filter((path) => path.includes(`/${folderName}/`))
    .sort((a, b) => a.localeCompare(b));
  return matches.map((path) => photoModules[path]);
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e5e5e5'/%3E%3C/svg%3E";

export function resolveCategoryImage(categoryId: string): string {
  return byBaseName.get(categoryId.toLowerCase()) ?? PLACEHOLDER;
}
