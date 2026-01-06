import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Vue3LowcodeVueSimulatorRenderer',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@vue3-lowcode/types', '@vue3-lowcode/utils', '@vue3-lowcode/renderer-core', '@vue3-lowcode/vue-renderer'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
