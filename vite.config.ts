import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: "**/*.tsx",
  }),
],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // target: 'https://balance-app.cyclic.app',
        target: 'https://balance-app.cyclic.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      cors:'false'
    },
    watch: {
      usePolling: true 
    }
  },
});
