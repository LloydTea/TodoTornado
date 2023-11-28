import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import sass from "vite-plugin-sass";

export default defineConfig({
  build: { outDir: "../dist" },
  plugins: [react()],
});
