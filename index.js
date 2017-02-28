const express = require('express');
const path = require('path');

const verify = require('./verify-number');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/check/:number', (req, res) => {
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