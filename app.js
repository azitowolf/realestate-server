var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),

  path = require('path'),
  Listing = require('./app/models/listing');

// Setup  
mongoose.connect(config.db, function(){
  console.log("connected to db" + config.db)
});
console.log("connecting to " + config.db);
var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

// Initialize
var app = express();

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

module.exports = require('./config/express')(app, config);  