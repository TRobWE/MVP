const express = require('express');

const app = express();
const path = require('path');

require('dotenv').config();

const bodyParser = require('body-parser');

// const igdb = require('igdb-api-node').default;

// const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // watchList: Array,
});

const User = mongoose.model('User', userSchema);

mongoose.connect(`${process.env.MONGO_URI}`, (err, database) => {
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

app.post('/login', (req, res) => {
  User.find(req.body, (err, userData) => {
    if (err) {
      return err;
    }
    if (!userData[0]) {
      res.redirect('login');
    } else {
      res.sendFile(path.join(__dirname, 'index.html'));
    }
    return userData;
  });
  // if (req.body.username.length && req.body.password.length) {
  //   res.sendFile(path.join(__dirname, 'index.html'));
  // } else {
  //   res.redirect('login');
  // }
  // res.redirect('/userdash');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/signup.html'));
});

app.post('/signup', (req, res) => {
  new User(req.body).save((err, result) => {
    if (err) {
      return err;
    }
    res.sendFile(path.join(__dirname, 'index.html'));
    return result;
  });
});

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'components/app.js'));
});

app.get('/search.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'components/search.js'));
});

app.get('/public/search.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/search.html'));
});
