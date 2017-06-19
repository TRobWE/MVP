const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

console.log('Revieeeewwwww!');
