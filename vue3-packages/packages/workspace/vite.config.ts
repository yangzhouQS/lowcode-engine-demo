import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: './dist',
      insertTypesEntry: true,
      copyDtsFiles: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vue3LowcodeWorkspace',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'vue',
        '@vue3-lowcode/types',
        '@vue3-lowcode/utils',
        '@vue3-lowcode/designer',
      ],
      output: {
        globals: {
          vue: 'Vue',
          '@vue3-lowcode/types': 'Vue3LowcodeTypes',
          '@vue3-lowcode/utils': 'Vue3LowcodeUtils',
          '@vue3-lowcode/designer': 'Vue3LowcodeDesigner',
        },
      },
    },
    target: 'es2020',
    minify: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
