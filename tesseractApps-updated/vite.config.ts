import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

// During SSG, vite-react-ssg runs a second server build in a temp dir.
// vite-plugin-compression must not run during that phase — it tries to
// compress files that don't exist yet and crashes with ENOENT.
const isSSGServerBuild = process.env.VITE_SSG === 'true';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(!isSSGServerBuild ? [
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
    ] : []),
  ],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    ssrManifest: true,
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
