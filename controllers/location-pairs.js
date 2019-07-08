'use strict';

const geolib = require('geolib');
const LocationValidator = require('../services/LocationValidator');
const Promise = require('bluebird');

const validateLocations = async(locations) => {
  if (!Array.isArray(locations)) {
    return false;
  }

  if (locations.length < 2) {
    return false;
  }

  const areLocationsValid = await Promise.map(locations, async function(location) {
    await Promise.delay(1000); // just to be sure, that we don't make too much
    // requests to the public api https://operations.osmfoundation.org/policies/nominatim/
    // in production we can use our own Nominatim server, but it takes much time to build maps

    return LocationValidator.validateLocation(location);
  }, { concurrency: 1 });

  return areLocationsValid.every(result => result === true);
};

const matchLocationsPairs = async(locations) => {
  const pairs = locations.map((location, index, arr) => {
    const withoutCurrentLocation = [
      ...arr.slice(0, index),
      ...arr.slice(index + 1),
    ];

    return {
      original: location,
      nearest: geolib.findNearest(location, withoutCurrentLocation),
    };
  });

  return pairs;
};

const generate = async(req, res) => {
  const locations = req.body.locations;

  try {
    const areLocationsValid = await validateLocations(locations);

    if (areLocationsValid) {
      const pairs = await matchLocationsPairs(locations);

      return res.json(pairs);
    }

    res.sendStatus(400);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { matchLocationsPairs, generate };
