import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vue3LowcodePlugin',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', '@vue3-lowcode/types', '@vue3-lowcode/utils'],
      output: {
        globals: {
          vue: 'Vue',
          '@vue3-lowcode/types': 'Vue3LowcodeTypes',
          '@vue3-lowcode/utils': 'Vue3LowcodeUtils'
        }
      }
    },
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@vue3-lowcode/types': resolve(__dirname, '../types/src'),
      '@vue3-lowcode/utils': resolve(__dirname, '../utils/src')
    }
  }
});
