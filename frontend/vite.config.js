import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests starting with /api to your backend server
      '/api': {
        target: 'http://localhost:5000', // Replace with your backend's actual port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
