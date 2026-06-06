import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/firestore.rules.test.js'],
    testTimeout: 15_000,
    hookTimeout: 15_000,
  },
})
