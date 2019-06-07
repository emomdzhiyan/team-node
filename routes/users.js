const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.User.scan().exec((err, docs) => {
    if (err) return res.status(500).send('Scanning error');
    return res.send(docs);
  });
});

module.exports = router;
