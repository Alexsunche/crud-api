import { createServer } from 'http';
import { routes } from './router/router.js';
import * as dotenv from 'dotenv';
dotenv.config()

const server = createServer((req, res) => {
  const urlParts = req.url.split('/');
  let routeHandler = routes[req.url];

  if (req.url.includes('/api/users/') && urlParts.length == 4)
    routeHandler = routes['/api/users/'];

  try {
    if (routeHandler && routeHandler[req.method]) {
      routeHandler[req.method](req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
});

const port = process.env.PORT || 3000;
console.log( process.env.PORT)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
