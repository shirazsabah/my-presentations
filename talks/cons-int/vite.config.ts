import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: [
      'seedrandom',
      '@formkit/auto-animate/vue'
    ],
    entries: ['talks/**/*.vue']  // optional: helps Vite scan your talk files
  },
  // Optional for GitHub Pages if you're deploying to a subfolder:
  base: '/my-presentations/',
});
