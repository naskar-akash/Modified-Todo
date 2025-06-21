import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
   server: {
    host: true, // 👈 allows external devices to connect
    port: 5173, // 👈 default Vite port, can be changed
  }
})
