/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    include: [
      'client/**/*.test.{ts,tsx,js,jsx}',
      'server/**/*.test.{ts,tsx,js,jsx}'
    ],
    globals: true
  }
});
