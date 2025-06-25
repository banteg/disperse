import { defineConfig } from 'vitest/config'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/generated.ts',
      ],
    },
    // Playwright specific config
    include: ['src/**/*.test.ts'],
    hookTimeout: 30000,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
})