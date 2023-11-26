import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "vite-plugin-sass";
import path from "path";

export default defineConfig({
  build: { outDir: "../dist" },
  plugins: [sass(), react()],
  resolve: {
    alias: {
      // Resolve src to /src directory
      src: path.resolve(__dirname, "src"),
      // Resolve node_modules to /node_modules directory
      node_modules: path.resolve(__dirname, "node_modules"),
    },
  },
});
