import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

// Plugin: converts the bundled stylesheet <link> to async loading
// so it doesn't block the initial render (eliminates render-blocking CSS)
const asyncCssPlugin = {
  name: 'async-css',
  transformIndexHtml(html: string) {
    // Replace: <link rel="stylesheet" crossorigin href="/assets/style-*.css">
    // With async load pattern (same as how Google Fonts are loaded)
    return html.replace(
      /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
      (_, href) =>
        `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'" />` +
        `<noscript><link rel="stylesheet" href="${href}"></noscript>`
    );
  },
};

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    asyncCssPlugin,
  ],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Sanity CMS client — stable, no React context, safe to isolate
          if (
            id.includes('node_modules/@sanity/client') ||
            id.includes('node_modules/@sanity/image-url')
          ) {
            return 'vendor-sanity-client';
          }
        },
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.names?.[0]?.split('.').pop() || ''
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(extType)) {
            return `assets/media/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
})
