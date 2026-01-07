import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@vue3-lowcode/types': resolve(__dirname, '../packages/types/src'),
      '@vue3-lowcode/utils': resolve(__dirname, '../packages/utils/src'),
      '@vue3-lowcode/editor-core': resolve(__dirname, '../packages/editor-core/src'),
      '@vue3-lowcode/designer': resolve(__dirname, '../packages/designer/src'),
      '@vue3-lowcode/renderer-core': resolve(__dirname, '../packages/renderer-core/src'),
      '@vue3-lowcode/vue-renderer': resolve(__dirname, '../packages/vue-renderer/src'),
      '@vue3-lowcode/vue-simulator-renderer': resolve(__dirname, '../packages/vue-simulator-renderer/src'),
      '@vue3-lowcode/editor-skeleton': resolve(__dirname, '../packages/editor-skeleton/src'),
      '@vue3-lowcode/workspace': resolve(__dirname, '../packages/workspace/src'),
      '@vue3-lowcode/plugin-system': resolve(__dirname, '../packages/plugin-system/src'),
      '@vue3-lowcode/shell': resolve(__dirname, '../packages/shell/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
