'use strict';

const express = require('express');
const router = express.Router();

const locationController = require('../controllers/location-pairs');

router.post('/', locationController.generate);

module.exports = router;
