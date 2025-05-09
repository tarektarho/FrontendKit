import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(path.dirname(new URL(import.meta.url).pathname), 'src/index.ts'),
      name: 'FrontendKit',
      fileName: (format) => `frontend-kit.${format}.js`,

    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
