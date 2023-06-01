import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        secure: false,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            if (!req.headers.cookie) {
              return;
            }
            // console.log('req.headers.cookie', req.headers.cookie)
            proxyReq.setHeader('cookie', req.headers.cookie);
          });
        },
      },
    },
  },
  plugins: [react()],
})
