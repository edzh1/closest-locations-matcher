'use strict';
const locationController = require('../controllers/location');

const expect = require('chai').expect;

it('Should return locations pairs', function() {
  const locations = [
    { latitude: 51.515, longitude: 7.453619 },
    { latitude: 52.516272, longitude: 13.377722 },
    { latitude: 51.518, longitude: 7.45425 },
    { latitude: 51.503333, longitude: -0.119722 },
  ];

  const pairs = [
    { latitude: 51.518, longitude: 7.45425 },
    { latitude: 51.518, longitude: 7.45425 },
    { latitude: 51.515, longitude: 7.453619 },
    { latitude: 51.515, longitude: 7.453619 },
  ];

  const locationsPairs = locationController.matchLocationsPairs(locations);

  expect(locationsPairs).to.eql(pairs);
});

