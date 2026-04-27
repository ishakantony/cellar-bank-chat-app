import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const templatePath = resolve(root, "public/sw.template.js");
const outputPath = resolve(root, "public/sw.js");

const template = await readFile(templatePath, "utf8");
const hash = createHash("sha256").update(template).digest("hex").slice(0, 12);
const output = template.replaceAll("__BUILD_HASH__", hash);

await writeFile(outputPath, output, "utf8");
console.log(`[build-sw] wrote public/sw.js with cache key cellar-bank-${hash}`);
