import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-solar-folder',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.startsWith('/Solar') || req.url.startsWith('/solar')) {
            let relativePath = req.url.replace(/^\/(Solar|solar)/i, '');
            if (!relativePath || relativePath === '/' || relativePath === '/index.html') {
              relativePath = '/index.html';
            }
            
            // Clean query params if any
            relativePath = relativePath.split('?')[0];

            const filePath = path.join(__dirname, '../Solar', relativePath);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              if (ext === '.html') res.setHeader('Content-Type', 'text/html; charset=utf-8');
              else if (ext === '.css') res.setHeader('Content-Type', 'text/css');
              else if (ext === '.js') res.setHeader('Content-Type', 'text/javascript');
              else if (ext === '.svg') res.setHeader('Content-Type', 'image/svg+xml');
              else if (ext === '.png') res.setHeader('Content-Type', 'image/png');
              else if (ext === '.jpg' || ext === '.jpeg') res.setHeader('Content-Type', 'image/jpeg');

              return res.end(fs.readFileSync(filePath));
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5174,
    host: true
  }
})
