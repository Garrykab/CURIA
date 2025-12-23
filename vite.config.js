import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-htaccess',
      closeBundle() {
        // Copier .htaccess du dossier public vers dist après le build
        try {
          copyFileSync(
            join(__dirname, 'public', '.htaccess'),
            join(__dirname, 'dist', '.htaccess')
          )
          console.log('✓ .htaccess copié dans dist/')
        } catch (error) {
          console.warn('⚠ Impossible de copier .htaccess:', error.message)
        }
      },
    },
  ],
})
