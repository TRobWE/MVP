const express = require('express');

const app = express();
const path = require('path');

require('dotenv').config();

const bodyParser = require('body-parser');

const igdb = require('igdb-api-node').default;

const client = igdb(process.env.IGDB_KEY);

// const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchList: Array,
});

const User = mongoose.model('User', userSchema);

mongoose.connect(`${process.env.MONGO_URI}`, (err, database) => {
  if (err) {
    return err;
  }
  app.listen(process.env.PORT, () => {});
  return database;
});

// app.post('/watchList', (req, res) => {
//   db.collection('watchList').save(req.body, (err, result) => {
//     if (err) {
//       return err;
//     }
//     res.redirect('/');
//     return result;
//   });
// });

app.post('/', (req, res) => {
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
      res.sendFile(path.join(__dirname, 'public/index.html'));
    }
    return userData;
  });
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
    res.sendFile(path.join(__dirname, 'public/index.html'));
    return result;
  });
});

// let allGames;
// let gameTitle;
// let gameReleaseData;
// let gamePic;

app.get('/search/*', (req, res) => {
  console.log("HIT SERVER");
  // console.log(req.query.query, 'BODY');
  client.games({
    fields: 'name,summary,release_dates,cover', // Return all fields
    limit: 5, // Limit to 5 results
    offset: 15,
    search: req.params[0], // Index offset for results
  }).then((ress) => {
    res.status(200).send(ress.body);
    // response.body contains the parsed JSON response to this query
  }).catch((error) => {
    res.status(400).send("Error querying game database");
  });
});
