import { defineConfig } from "vite"
import path from "path"
import { name } from "./package.json"

const formattedName = name.match(/[^/]+$/)?.[0] ?? name

export default defineConfig({
  build: {
    outDir: "dist/vite",
    lib: {
      entry: path.resolve(path.dirname(new URL(import.meta.url).pathname), "src/index.ts"),
      name: formattedName,
      formats: ["es", "umd"],
      fileName: (format) => `${formattedName}.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
})
