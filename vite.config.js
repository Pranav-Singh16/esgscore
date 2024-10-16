import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // or remove this line for relative paths
  plugins: [react()],
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
});