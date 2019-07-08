'use strict';

module.exports = {
  apps: [
    {
      name: 'closest-locations-matcher',
      script: './bin/www',
      env: {
        NODE_ENV: 'production',
        PORT: 1337,
      },
    },
  ],
};
