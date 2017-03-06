if (process.env.NODE_ENV === 'debug') {
  require('dotenv').load();
}

const express = require('express');
const path = require('path');

const verify = require('./verify-number');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

function checkForCodepenCors(req, res, next) {
  if (req.get('Origin')) {
    let origin  = req.get('Origin');
    if (origin.endsWith('codepen.io')) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    } else {
      res.status(401).send();
    }
  } else {
    next();
  }
}

app.get('/check/:number', checkForCodepenCors, (req, res) => {
  verify(req.params.number)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send('An unexpected error occurred');
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});