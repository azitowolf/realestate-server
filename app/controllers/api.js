var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  path = require('path'),
  Listing = mongoose.model('Listing');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next){
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
})

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

// Filters
router.get('/api', function (req, res, next) {

  const limit = req.query.limit;
  var query = req.query;

  var mongoQuery = {};
  query.beds === 'false' ? "" : mongoQuery.beds = query.beds;
  query.baths === 'false' ? "" : mongoQuery.baths = query.baths;
  query.district === 'false' ? "" : mongoQuery.district = query.district;
  mongoQuery.rent = {
    $lte: 99999999999,
    $gte: 0
  };
  if (query.rentMax !== "false") {
    mongoQuery.rent.$lte = query.rentMax;
  }
  if (query.rentMin !== "false") {
    mongoQuery.rent.$gte = query.rentMin;
  }

  console.log(mongoQuery)

  Listing.find(mongoQuery,
    function (err, listings) {
      if (err) return next(err);
      res.send(listings);
    })
    .limit(parseInt(limit))

});

// Text Search
router.get('/api/search', function (req, res, next) {

  var query = req.query;

  console.log(query.term)

  Listing.find(
    {
      $text: {$search: query.term}
    },{
      score: { $meta: "textScore" }
    }, function (err, listings) {
      if (err) return next(err);
      res.send(listings);
    }).sort({score:{$meta:"textScore"}})
});

// Get ID
router.get('/api/listing/:id', function (req, res, next) {

  Listing.find({ id: req.params.id }, function (err, listings) {
    if (err) return next(err);
    res.send(listings);
  })
});

// Catch
router.get('*', function (err, req, res, next) {
  res.render('../views/error.jade', { message: "API ERROR", error: err })
});
