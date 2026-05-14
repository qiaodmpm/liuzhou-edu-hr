import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(".");
const dist = resolve(root, "dist");

mkdirSync(dist, { recursive: true });
cpSync(resolve(root, "index.html"), resolve(dist, "index.html"));

if (existsSync(resolve(root, "src"))) {
  cpSync(resolve(root, "src"), resolve(dist, "src"), { recursive: true });
}

console.log("Build completed: dist directory generated.");
