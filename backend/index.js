const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const posts = [
  { id: 1, title: "Lost Wallet", description: "Black leather wallet lost near Main Street." },
  { id: 2, title: "Found Keys", description: "Bunch of keys found in the park." }
];

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});