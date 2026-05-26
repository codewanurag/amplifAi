import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_URL = process.env.VITE_API_URL || "http://127.0.0.1:5000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": API_URL,
    },
  },
});