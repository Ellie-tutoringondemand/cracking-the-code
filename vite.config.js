import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/cracking-the-code/',
  plugins: [react()],
});
