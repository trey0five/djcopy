import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hosted under https://trey0five.github.io/djcopy/ so assets must resolve
// from that subpath. Dev server stays at "/".
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/djcopy/' : '/',
  server: { host: true, port: 5173 }
}))
