import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "users",
      filename: "remoteEntry.js",
      exposes: {
        "./UsersList": "./src/components/UsersList",
        "./UsersApp": "./src/App",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 3001,
    cors: true,
    proxy: {
      "/api": {
        target: process.env.API_URL || "http://localhost:5555",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
