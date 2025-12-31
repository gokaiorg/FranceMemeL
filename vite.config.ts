import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'react-native': 'react-native-web',
        },
        extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx']
    },
    define: {
        global: 'window',
        __DEV__: JSON.stringify(true),
        process: {
            env: {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
});
