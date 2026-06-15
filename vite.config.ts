import path from "node:path";

import { defineConfig } from "vite-plus";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "server-only": path.resolve(__dirname, "vitest.server-only.ts"),
    },
  },
  fmt: {
    bracketSameLine: true,
    ignorePatterns: [".agents"],
    jsdoc: true,
    sortImports: true,
    sortPackageJson: {
      sortScripts: true,
    },
    sortTailwindcss: true,
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules", ".next", "e2e"],
  },
});
