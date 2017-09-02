var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://azitowolf:livwell6160@ds143362.mlab.com:43362/livwell-mongodb'
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/express-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://azitowolf:livwell6160@ds143362.mlab.com:43362/livwell-mongodb'
  }
};

module.exports = config[env];

/*
   _____
/     \
vvvvvvv  /|__/|
   I   /O,O   |
   I /_____   |      /|/|
   |/^ ^ ^ \  |    /00  |    _//|
   |^ ^ ^ ^ |W|   |/^^\ |   /oo |  TEACH ME!
    \m___m__|_|    \m_m_|   \mm_|
*/
