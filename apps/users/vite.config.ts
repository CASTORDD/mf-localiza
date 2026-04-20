import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "src/components/UsersList.tsx",
        "src/hooks/useGetUsers.tsx",
        "src/hooks/useUsers.tsx",
        "src/hooks/usepagination.tsx",
        "src/services/users-services.ts",
      ],
      exclude: ["src/test/**"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
