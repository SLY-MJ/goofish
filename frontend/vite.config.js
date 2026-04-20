import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const backendTarget = process.env.VITE_API_TARGET || "http://localhost:8080";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": backendTarget,
      "/image": backendTarget,
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
