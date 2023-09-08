import http from 'node:http';

const server = http.createServer();
const port = 3333;

server.listen(port);
console.log(`The server is running on localhost:${port}`);
