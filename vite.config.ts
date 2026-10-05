import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'hostinger-dev-transform',
      transformIndexHtml(html) {
        if (command === 'serve') {
          // En modo desarrollo local, servir src/main.tsx para HMR
          return html
            .replace(/<script type="module" crossorigin src="\/assets\/[^"]+"><\/script>/, '<script type="module" src="/src/main.tsx"></script>')
            .replace(/<link rel="stylesheet" crossorigin href="\/assets\/[^"]+">/, '');
        }
        return html;
      },
    },
  ],
}));
