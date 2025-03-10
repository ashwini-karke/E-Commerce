import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Bind to all network interfaces (needed for Railway)
    port: parseInt(process.env.PORT || "4173"), // Use Railway's assigned port
  },
});
