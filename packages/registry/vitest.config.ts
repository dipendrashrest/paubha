import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    // vitest-axe's singleton cannot run concurrently; parallel files throw
    // "Axe is already running" and overlay tests hit the 5s default timeout.
    fileParallelism: false,
    testTimeout: 15000,
  },
});
