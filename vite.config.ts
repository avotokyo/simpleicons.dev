import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    bracketSameLine: true,
    jsdoc: true,
    sortImports: true,
    sortPackageJson: {
      sortScripts: true,
    },
    sortTailwindcss: true,
  },
});
