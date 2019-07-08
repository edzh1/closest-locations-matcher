'use strict';

const request = require('request-promise');
const geolib = require('geolib');

class LocationValidator {
  async getDataByName(locationName) {
    const options = {
      uri: 'https://nominatim.openstreetmap.org/search/',
      qs: {
        format: 'json',
        q: locationName,
        limit: 1,
      },
      headers: {
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/json',
      },
      json: true,
    };

    return request(options).then((json) => json);
  }

  async validateLocation(location) {
    if (!geolib.isValidCoordinate(location) || !location.name) {
      return false;
    }

    const precisionInMeters = 400;

    const locationsByName = await this.getDataByName(location.name);

    const locationData = locationsByName.find((locationByName) => {
      return geolib.isPointWithinRadius(location, {
        lat: parseFloat(locationByName.lat),
        lon: parseFloat(locationByName.lon),
      }, precisionInMeters);
    });

    return !!locationData;
  }
}

module.exports = new LocationValidator();
