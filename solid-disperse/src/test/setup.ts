import '@testing-library/jest-dom'

// Mock window.ethereum for tests
const globalAny = globalThis as any;
if (!globalAny.window) {
  globalAny.window = {} as any;
}
globalAny.window.ethereum = {
  request: async () => null,
  on: () => {},
  removeListener: () => {},
}

// Mock console methods to reduce noise in tests
globalAny.console = {
  ...console,
  log: () => {},
  debug: () => {},
  info: () => {},
  warn: () => {},
}