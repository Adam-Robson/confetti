/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'client/**/*.test.{ts,tsx,js,jsx}',
      'server/**/*.test.{ts,tsx,js,jsx}'
    ],
    globals: true
  }
})
