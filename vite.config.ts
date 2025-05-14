import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "vitest/config";
import { visualizer } from "rollup-plugin-visualizer";
import { babel } from "@rollup/plugin-babel";
import compression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: "build-stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      plugins: [["babel-plugin-styled-components", { pure: true }]],
      exclude: "node_modules/**",
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://api.pexels.com/v1",
  //       changeOrigin: true,
  //       rewrite: (path: string) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-router": ["react-router-dom"],
        },
      },
    },
    target: "es2015",
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: false,
  },
});
