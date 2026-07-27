import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, normalize, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const port = Number(process.env.PORT || 4173);
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || '127.0.0.1'}`);
  const relative = normalize(decodeURIComponent(url.pathname)).replace(/^[/\\]+/, '');
  const candidate = resolve(root, relative || 'index.html');
  const file = existsSync(candidate) && statSync(candidate).isDirectory()
    ? resolve(candidate, 'index.html')
    : candidate;

  if (!file.startsWith(`${root}/`) || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404, { 'Cache-Control': 'no-store' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'Cache-Control': 'no-store, max-age=0',
    'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream',
  });
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Mixly no-cache server: http://127.0.0.1:${port}/`);
});
