import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Ne définir que les variables nécessaires pour TinaCMS
    // et les convertir en chaînes JSON pour esbuild
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    'process.env.NEXT_PUBLIC_TINA_CLIENT_ID': JSON.stringify(process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ''),
    'process.env.NEXT_PUBLIC_TINA_BRANCH': JSON.stringify(process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 'main'),
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});

