import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 0,
  },
  esbuild: {
    minifySyntax: false,
  },
});
