'use strict';

const expect = require('chai').expect;
const matchPairs = require('../controllers/location-pairs').matchLocationsPairs;
const LocationValidator = require('../services/LocationValidator');

it('Should return locations pairs', async function() {
  const locations = [
    { lat: 40.6892532, lon: -74.0445481714432, name: 'The statue of liberty' },
    { lat: 52.516272, lon: 13.377722, name: 'Brandenburg Gate' },
    { lat: 51.515, lon: 7.453619, name: 'Leonie-Reygers-Terrasse' },
  ];

  const pairs = [
    {
      original: {
        lat: 40.6892532,
        lon: -74.0445481714432,
        name: 'The statue of liberty',
      },
      nearest: {
        lat: 51.515,
        lon: 7.453619,
        name: 'Leonie-Reygers-Terrasse',
      },
    },
    {
      original: {
        lat: 52.516272,
        lon: 13.377722,
        name: 'Brandenburg Gate',
      },
      nearest: {
        lat: 51.515,
        lon: 7.453619,
        name: 'Leonie-Reygers-Terrasse',
      },
    },
    {
      original: {
        lat: 51.515,
        lon: 7.453619,
        name: 'Leonie-Reygers-Terrasse',
      },
      nearest: {
        lat: 52.516272,
        lon: 13.377722,
        name: 'Brandenburg Gate',
      },
    },
  ];

  const locationsPairs = await matchPairs(locations);

  expect(locationsPairs).to.eql(pairs);
});

it('Should pass validation', async function() {
  LocationValidator.getDataByName = () => {
    return new Promise((resolve) => resolve([
      {
        place_id: 83751825,
        licence: 'licence',
        osm_type: 'way',
        osm_id: 32965412,
        boundingbox: [
          '40.6888049',
          '40.6896741',
          '-74.0451069',
          '-74.0439637',
        ],
        lat: '40.6892532',
        lon: '-74.0445481714432',
        display_name: 'Statue of Liberty, Flagpole Plaza',
        class: 'tourism',
        type: 'attraction',
        importance: 0.857623489169226,
        icon: 'https://nominatim.openstreetmap.org/images/mapicons/poi_point_of_interest.p.20.png',
      },
      {
        place_id: 35368280,
        licence: 'licence',
        osm_type: 'node',
        osm_id: 2837177940,
        boundingbox: [
          '41.3438445',
          '41.3439445',
          '-86.3112295',
          '-86.3111295',
        ],
        lat: '41.3438945',
        lon: '-86.3111795',
        display_name: 'Statue of Liberty, North Center Street',
        class: 'tourism',
        type: 'artwork',
        importance: 0.669546599813706,
        icon: 'https://nominatim.openstreetmap.org/images/mapicons/tourist_art_gallery2.p.20.png',
      },
    ]));
  };

  const locations = {
    lat: 40.6892532,
    lon: -74.0445481714432,
    name: 'The statue of liberty',
  };

  const isValid = await LocationValidator.validateLocation(locations);

  expect(isValid).to.equal(true);
});

it('Should not pass validation with invalid coords', async function() {
  const location = {
    lat: 400.6892532,
    lon: -74.0445481714432,
    name: 'The statue of liberty',
  };

  const isValid = await LocationValidator.validateLocation(location);

  expect(isValid).to.not.equal(true);
});

it('Should not pass validation with name which are not belong to coords', async function() {
  LocationValidator.getDataByName = () => {
    return new Promise((resolve) => resolve([
      {
        place_id: 83751825,
        licence: 'licence',
        osm_type: 'way',
        osm_id: 32965412,
        boundingbox: [
          '40.6888049',
          '40.6896741',
          '-74.0451069',
          '-74.0439637',
        ],
        lat: '40.6892532',
        lon: '-74.0445481714432',
        display_name: 'Statue of Liberty, Flagpole Plaza',
        class: 'tourism',
        type: 'attraction',
        importance: 0.857623489169226,
        icon: 'https://nominatim.openstreetmap.org/images/mapicons/poi_point_of_interest.p.20.png',
      },
    ]));
  };

  const location = {
    lat: 20.6892532,
    lon: -34.0445481714432,
    name: 'Statue of liberty',
  };

  const isValid = await LocationValidator.validateLocation(location);

  expect(isValid).to.not.equal(true);
});
