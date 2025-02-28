import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Default to '/SETv3/' for production builds unless BASE_URL env var is set
const base = process.env.NODE_ENV === 'production' 
  ? (process.env.BASE_URL || '/SETv3/') 
  : '/';

export default defineConfig({
  plugins: [react()],
  base, // Use the determined base path
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: true
  }
});