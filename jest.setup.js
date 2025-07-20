import '@testing-library/jest-dom'

// Polyfill ResizeObserver for tests
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
