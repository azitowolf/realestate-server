var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'livwell-server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://azitowolf:livwell6160@ds143362.mlab.com:43362/livwell-mongodb'
  },

  production: {
    root: rootPath,
    app: {
      name: 'livwell-server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://azitowolf:livwell6160@ds143362.mlab.com:43362/livwell-mongodb'
  }
};

module.exports = config[env];
