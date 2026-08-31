import { chmodSync } from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node18",
  clean: true,
  shims: true,
  onSuccess: async () => {
    chmodSync("dist/index.js", 0o755);
  },
});
