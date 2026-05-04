import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3111,
        proxy: {
            '/api': 'http://localhost:3112'  // your server port
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                loadPaths: [path.resolve("./src/styles")]
            }
        }
    },
    resolve: {
        alias: {
            '~': path.resolve(import.meta.dirname, 'src')
        }
    }
})