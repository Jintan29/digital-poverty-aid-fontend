import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  //เพิ่ม proxy เข้ามาเพื่อใช้ยิง api 
  server: {
    proxy: {
      '/sradss/api': {
        target: 'http://sradss.ppaos.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/sradss\/api/, '/sradss/api'),
      },
    },
  },
});
