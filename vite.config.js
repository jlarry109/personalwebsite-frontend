import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://me-api.joneslarry.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)) // Should point to 'src'
      }
    }
});
