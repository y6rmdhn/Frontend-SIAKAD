import "@testing-library/jest-dom/vitest";

const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(), // Mock the observe method
    unobserve: vi.fn(), // Mock the unobserve method
    disconnect: vi.fn(), // Mock the disconnect method
  }));

  vi.stubGlobal('ResizeObserver', ResizeObserverMock);