const express = require('express');
const app = express();

const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: false }));

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
app.get('/form', (req, res) => {
  res.sendFile('04-form.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// http://localhost:5001/submit should return all the data the user entered
app.post('/submit', (req, res) => {
  const { username, email, comments, newsletter } = req.body;
  res.json({ username, email, comments, newsletter: newsletter === 'yes' });
});
