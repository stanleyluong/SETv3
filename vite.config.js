import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Always use root for base path for Amplify deployment
const base = '/';

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