import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Dùng đường dẫn tương đối để chạy được trên GitHub Pages
  // (dạng username.github.io/tên-repo/) mà không cần biết trước tên repo.
  base: './',
  plugins: [react()],
});
