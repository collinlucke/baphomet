import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import del from 'rollup-plugin-delete';

export default defineConfig(async ({ mode }) => {
  // Let's you use env.<whatever>
  const env = loadEnv(mode, process.cwd(), '');

  const copyPath = env.NODE_ENV === 'production' && env.COPY_TO_PROD_PATH;

  return {
    build: {
      rollupOptions: {
        plugins: [
          // Deletes what's in the existing prod assets directory
          env.NODE_ENV === 'production' &&
            del({
              targets: env.NODE_ENV === 'production' && env.DELETE_ASSETS_PATH,
              force: true
            })
        ]
      }
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }),
      env.NODE_ENV === 'production' &&
        viteStaticCopy({
          // Copies /dist/ contents to prod assets
          targets: [{ src: 'dist/*', dest: copyPath }]
        })
    ]
  };
});
