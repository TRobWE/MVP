const express = require('express');

const app = express();
const path = require('path');

require('dotenv').config();

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;

MongoClient.connect(`${process.env.MONGO_URI}`, (err, database) => {
  if (err) {
    return err;
  }
  db = database;
  app.listen(process.env.PORT, () => {});
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
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/login', (req, res) => {
  if (req.body.username.length && req.body.password.length) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.redirect('login');
  }
  // res.redirect('/userdash');
});
