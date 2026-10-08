// ===== SESSION 7: no alias -- every import was a relative path =======
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
//
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });
//
// NOTE: shadcn's generated files import from "@/lib/utils". Vite and
//       TypeScript each need to be told what "@/" means, separately.
// ===== SESSION 8: "@/" now means "./src", for Vite ===================
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // import.meta.dirname, not __dirname: this file is an ES module.
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
