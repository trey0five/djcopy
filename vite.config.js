import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hosted on the custom domain dylanjcopy.com (via GitHub Pages CNAME), so
// assets resolve from the site root instead of the /djcopy/ subpath.
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { host: true, port: 5173 }
})
