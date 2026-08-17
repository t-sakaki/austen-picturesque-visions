/**
 * Lightweight static server for "Picturesque Visions" demo
 * Place this at the root of the exported build folder and run:
 * $ node server.js
 * Then open http://localhost:3412 in your browser.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3412;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? '/index.html' : req.url);

  // Handle _next static files
  if (req.url.startsWith('/_next/static/')) {
    filePath = path.join(ROOT, req.url);
  } else if (req.url !== '/' && !req.url.startsWith('/_next')) {
    // Try to serve index.html for SPA routes (Next.js)
    const indexPos = filePath.indexOf('index.html');
    if (indexPos > -1) {
      filePath = filePath.substring(0, indexPos) + 'index.html';
    } else {
      const indexExists = fs.existsSync(filePath + '/index.html');
      if (indexExists) {
        filePath = filePath + '/index.html';
      } else {
        filePath = filePath + '.html';
      }
    }
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Fallback to 404 for SPA deep links
        fs.readFile(path.join(ROOT, 'index.html'), (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end('Server error: Cannot load index.html');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Picturesque Visions Demo Server running at http://localhost:${PORT}/`);
  console.log(`Ready for Emilia — Enjoy!`);
});