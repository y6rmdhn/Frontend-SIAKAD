import path from "path";
import { defineConfig } from 'vitest/config'
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api-wilayah': {
        target: 'https://wilayah.id',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-wilayah/, ''),
      },
    },
  },
});
