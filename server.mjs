import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mime = { '.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.json':'application/json','.md':'text/markdown','.pdf':'application/pdf' };

const server = http.createServer((req, res) => {
  let fp = path.join(__dirname, req.url.split('?')[0]);
  if (fp.endsWith('/')) fp += 'index.html';
  console.log(req.method, req.url, '→', fp);
  function serveFile(filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (!path.extname(filePath)) {
          serveFile(filePath + '.html');
        } else {
          console.log('  404'); res.writeHead(404); res.end('Not Found: ' + req.url);
        }
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
      res.end(data);
      console.log('  200');
    });
  }
  serveFile(fp);
});
server.listen(3000, () => console.log('Server running: http://localhost:3000'));
