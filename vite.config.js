import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: true,
    assetsDir: 'assets',
  },
})
