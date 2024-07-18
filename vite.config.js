import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input:
            {
                networks: 'networks/main.js',
                popup: 'popup/popup.js',
                background: 'background.js'
            },

            output: {
                format: 'es',
                dir: 'dist',
                entryFileNames: '[name].js',
            },
        },
    },
});
