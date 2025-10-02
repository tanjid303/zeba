import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  server: {
    host: true,
    port: 3000,
    strictPort: false,
  },
  vite: {
    server: {
      allowedHosts: [
        'https://8c615a687f32.ngrok-free.app/', // your current ngrok URL
        '.ngrok-free.app',             // all subdomains
        '0.0.0.0',                     // optional: allow any host
      ],
    },
  },
})
