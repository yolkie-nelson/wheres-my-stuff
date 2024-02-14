import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "tailwindcss";
import dotenv from 'dotenv';


dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
        plugins: [tailwindcss()],
        },
    },
    plugins: [react()],
    server: {
        host: true,
        strictPort: true,
        watch: {
            usePolling: true
        }
    },
    base: 'https://dev-dynasty.gitlab.io/wheres-my-stuff/',
})
