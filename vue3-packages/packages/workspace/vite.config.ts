import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({ rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Vue3LowcodeWorkspace',
      fileName: (format) => `index.${format === 'es' ? 'js' : format}`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'element-plus', '@vue3-lowcode/types', '@vue3-lowcode/utils'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@vue3-lowcode/types': 'Vue3LowcodeTypes',
          '@vue3-lowcode/utils': 'Vue3LowcodeUtils',
        },
      },
    },
  },
});
