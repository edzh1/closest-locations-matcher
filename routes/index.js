'use strict';

const express = require('express');
const router = express.Router();

const locationController = require('../controllers/location');

router.post('/', function(req, res, next) {
  const pairs = locationController.matchLocationsPairs(req.body);

  res.json(pairs);
});

module.exports = router;
