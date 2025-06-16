import '@testing-library/jest-dom'

// Mock window.ethereum for tests
global.window = global.window || ({} as any)
global.window.ethereum = {
  request: async () => null,
  on: () => {},
  removeListener: () => {},
}

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: () => {},
  debug: () => {},
  info: () => {},
  warn: () => {},
}