const http = require('http');

const server = http.createServer((req, res) => {
  // These headers are important. They allow cross-origin requests.
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  // For OPTIONS (preflight) requests, just end the response.
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  // For any other request, send a simple message.
  res.end(JSON.stringify({ message: 'Hello from the simple test server!' }));
});

const PORT = 3000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Simple test server running at http://${HOST}:${PORT}/`);
});