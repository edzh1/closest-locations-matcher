'use strict';

const geolib = require('geolib');

exports.matchLocationsPairs = (locations) => {
  const pairs = locations.map((location, index, arr) => {
    const excluded = [...arr.slice(0, index), ...arr.slice(index + 1)];

    return geolib.findNearest(location, excluded);
  });

  return pairs;
};
