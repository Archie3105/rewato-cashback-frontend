import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  base:'/',
  plugins: [
    tailwindcss(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects",
          dest: "",
        },
      ],
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
