const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
app.get('/welcome', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send('Welcome to the Express Routing Exercise!');
});

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
app.get('/redirect', (req, res) => {
  res.redirect(302, '/redirected');
});

app.get('/redirected', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send('You have been redirected successfully!');
});

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
app.get('/cache', (req, res) => {
  res.status(200);
  res.set({
    'Content-Type': 'text/html',
    'Cache-Control': 'max-age=86400',
  });
  res.send('this resource was cached');
});

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
app.get('/cookie', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/plain' });
  res.cookie('hello', 'world');
  res.send('cookies... yummm');
});

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
app.use((req, res) => {
  res.status(404);
  res.set({ 'Content-Type': 'text/html' });
  res.send('404 - page not found');
});

// not needed - const routes = ['welcome', 'redirect', 'redirected', 'cache', 'cookie', 'other'];

/* app.get('/', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send('Express Routing Exercise');
}); */

// Add your code here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
