import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import LodashWebpackPlugin from 'lodash-webpack-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), new LodashWebpackPlugin({ function: true })],
  resolve: {
    alias: {
      '@': resolve(__dirname, ''),
    },
  },
});
