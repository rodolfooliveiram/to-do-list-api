import http from 'node:http';
import { routes } from './routes.js';
import { json } from './middleware/json.js';

const port = 3334;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(req, res);
  }

  res.writeHead(404).end();
});

server.listen(port);
console.log(`The server is running on localhost:${port}`);
