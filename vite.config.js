import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: process.env.GITHUB_ACTIONS ? '/Fyodor-Dostoevsky-site-2-/' : '/',
}));
