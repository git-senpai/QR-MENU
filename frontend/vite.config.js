import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all IPs
    port: 5174, // Optional: Specify the port
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(
      "https://qr-menu-hp3b.onrender.com/api"
    ),
  },
});
