import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vue3Renderer',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@vue3-engine/renderer-core', '@vue3-engine/types', '@vue3-engine/utils'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    outDir: 'lib',
    emptyOutDir: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'lib',
    }),
  ],
});
