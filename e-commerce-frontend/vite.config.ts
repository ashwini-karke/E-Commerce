// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "0.0.0.0", // Bind to all network interfaces (needed for Railway)
//     port: parseInt(process.env.PORT || "4173"), // Use Railway's assigned port
//   },
//   preview: {
//     allowedHosts: ["brave-consideration-production.up.railway.app"], // Allow Railway deployment
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Needed for Railway deployment
    port: parseInt(process.env.PORT || "4173"),
    proxy: {
      "/api": {
        target: "https://e-commerce-production-20ad.up.railway.app",
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  preview: {
    allowedHosts: ["brave-consideration-production.up.railway.app"],
  },
});
