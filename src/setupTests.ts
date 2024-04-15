/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import '@testing-library/jest-dom'

// Mocking getContext for HTMLCanvasElement
global.HTMLCanvasElement.prototype.getContext = () =>
  ({
    clearRect: jest.fn()
  }) as any

// Mock HTMLMediaElement play method
HTMLMediaElement.prototype.play = jest.fn().mockImplementation(async () => {
  await Promise.resolve()
})

// Mocking IntersectionObserver
class IntersectionObserver {
  constructor() {}

  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver
})
// Mocking matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }
  }
