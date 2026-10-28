const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
const welcome = function welcome(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Welcome to the Node Routing Exercise!</h1>');
  res.end();
};

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
const redirect = function redirect(req, res) {
  res.writeHead(302, { Location: '/redirected' });
  res.end();
};

const redirected = function redirected(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>You have been redirected!</h1>');
  res.end();
};

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
const cache = function cache(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Cache-Control': 'max-age=86400',
  });
  res.write('<h1>this resource was cached</h1>');
  res.end();
};

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
const cookie = function cookie(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Set-Cookie': 'hello=world',
  });
  res.write('cookies... yummm');
  res.end();
};

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const notFound = function notFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('<h1>404 - page not found</h1>');
  res.end();
};

const server = http.createServer((req, res) => {
  const routes = {
    '/welcome': welcome,
    '/redirect': redirect,
    '/redirected': redirected,
    '/cache': cache,
    '/cookie': cookie,
  };

  const route = routes[req.url];
  if (route) {
    route(req, res);
  } else {
    notFound(req, res);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
