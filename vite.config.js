import { defineConfig, loadEnv } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'

const env = loadEnv('all', process.cwd(), "");
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.BASE_URL': JSON.stringify(env.BASE_URL),
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
