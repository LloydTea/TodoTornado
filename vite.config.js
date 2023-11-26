import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "vite-plugin-sass";

// https://vitejs.dev/config/
export default defineConfig({
  build: { outDir: "../dist" },
  plugins: [sass(), react()],
  resolve: {
    alias: {
      src: "/src",
      node_modules: "/node_modules",
    },
  },
});
