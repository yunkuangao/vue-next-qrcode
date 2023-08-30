import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteVueJSX from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteVueJSX()],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'packages/index.ts'),
      name: 'Vue3QRCode',
      fileName: 'vue3-qrcode',
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'naive-ui'],
      output: {
        globals: {
          vue: 'Vue',
          $naive: '$naive',
        },
      },
    },
  },
})
