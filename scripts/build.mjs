import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { extname, resolve } from "node:path";

const root = resolve(".");
const dist = resolve(root, "dist");

mkdirSync(dist, { recursive: true });

// Copy all HTML files
for (const f of readdirSync(root)) {
  if (extname(f) === ".html") {
    cpSync(resolve(root, f), resolve(dist, f));
  }
}

if (existsSync(resolve(root, "src"))) {
  cpSync(resolve(root, "src"), resolve(dist, "src"), { recursive: true });
}

if (existsSync(resolve(root, "docs"))) {
  cpSync(resolve(root, "docs"), resolve(dist, "docs"), { recursive: true });
}

console.log("Build completed: dist directory generated.");
