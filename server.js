const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;

MongoClient.connect('mongodb://trobwe:grapp@ds131782.mlab.com:31782/grapp', (err, database) => {
  if (err) {
    return err;
  }
  db = database;
  app.listen(PORT, () => {});
  return db;
});

app.post('/watchList', (req, res) => {
  db.collection('watchList').save(req.body, (err, result) => {
    if (err) {
      return err;
    }
    res.redirect('/');
    return result;
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
