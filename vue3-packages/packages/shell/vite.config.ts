import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: './dist',
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'Vue3LowcodeShell',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue', '@vue3-lowcode/types', '@vue3-lowcode/utils', '@vue3-lowcode/editor-core', '@vue3-lowcode/designer'],
      output: {
        globals: {
          vue: 'Vue',
          '@vue3-lowcode/types': 'Vue3LowcodeTypes',
          '@vue3-lowcode/utils': 'Vue3LowcodeUtils',
          '@vue3-lowcode/editor-core': 'Vue3LowcodeEditorCore',
          '@vue3-lowcode/designer': 'Vue3LowcodeDesigner',
        },
      },
    },
    target: 'es2020',
    minify: false,
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },
  },
});
