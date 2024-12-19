/// <reference types="vitest/config" />
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'happy-dom', // or "jsdom" for component testing
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
    },
    silent: true, // Suppresses all output except for errors
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
