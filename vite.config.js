import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
  base: './',
  plugins: [react(), postcss()],
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: true,
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    fs: {
      cache: 'mem',
    },
  },
  css: {
    postcss: {
      plugins: [
        require('postcss-webkit-text-size-adjust')({
          standardProperty: true,
        }),
        require('autoprefixer'), // Optional, for broader compatibility
      ],
    },
  },
});