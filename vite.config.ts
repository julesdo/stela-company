import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Fonction pour convertir les variables d'environnement en format esbuild-safe
function getEnvDefines() {
  const defines: Record<string, string> = {};
  
  // Ne définir que les variables nécessaires et les convertir en chaînes JSON
  const envVars = [
    'NODE_ENV',
    'NEXT_PUBLIC_TINA_CLIENT_ID',
    'NEXT_PUBLIC_TINA_BRANCH',
    'NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF',
  ];
  
  envVars.forEach(key => {
    const value = process.env[key];
    if (value !== undefined) {
      defines[`process.env.${key}`] = JSON.stringify(value);
    }
  });
  
  return defines;
}

export default defineConfig({
  plugins: [react()],
  define: getEnvDefines(),
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});

