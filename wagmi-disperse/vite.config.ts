import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      gzipSize: true,
      template: "treemap",
      filename: "dist/stats.html",
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "wagmi-vendor": ["wagmi", "viem"],
          "ui-vendor": ["@tanstack/react-query", "fuse.js"],
          chains: ["wagmi/chains"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
