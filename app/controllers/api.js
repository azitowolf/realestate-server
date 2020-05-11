const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      path = require('path'),
      Listing = require('../models/listing');

module.exports = function (app) {
  app.use('/', router);
};

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


// Serve the Front-End Application in Production
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
})

// Filters/ base API
router.get('/api', function (req, res, next) {

  const limit = req.query.limit;
  var query = req.query;

  var mongoQuery = {};
  mongoQuery.rent = {
    $lte: 99999999999,
    $gte: 0
  };
  mongoQuery.isAvailable = true;

  if (query.textSearch !== 'false') mongoQuery.$text = {$search: query.textSearch};
  if (query.beds !== 'false') mongoQuery.beds = query.beds;
  if (query.baths !== 'false') mongoQuery.baths = query.baths;
  if (query.district !== 'false') mongoQuery.district = query.district;

  if (query.rentMax !== "false") {
    mongoQuery.rent.$lte = query.rentMax;
  }
  if (query.rentMin !== "false") {
    mongoQuery.rent.$gte = query.rentMin;
  }

  console.log(JSON.stringify(mongoQuery))

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
      $text: { $search: query.term }
    }, {
      score: { $meta: "textScore" }
    }, function (err, listings) {
      if (err) return next(err);
      res.send(listings);
    }).sort({ score: { $meta: "textScore" } })
});

// Get ID
router.get('/api/listing/:id', function (req, res, next) {

  Listing.find({ id: req.params.id }, function (err, listings) {
    if (err) return next(err);
    res.send(listings);
  })
});

// Update availability for ID
router.post('/api/update/:id', function (req, res, next) {

  const id = mongoose.Types.ObjectId(req.params.id);
  const payload = req.query.available; 

  Listing.findById(id, function(err, doc) {
    if (err) throw err;

    doc.isAvailable = payload;
    doc.availabilityLastUpdated = new Date().toDateString();
  
    // save the doc
    doc.save(function(err) {
      if (err) throw err;
      console.log(doc);
      console.log('listing successfully updated!');
    });
  
  });  


});

// Create Listing
router.post('/api/create', function (req, res, next) {

  var fakeListing = new Listing({
    id: 50000,
    address: "fakeaddress"
  })

  fakeListing.save(function (err) {
    if (err) throw err;

    console.log('listing saved successfully!');
  });


});



// Catch
router.get('*', function (err, req, res, next) {
  res.send(err)
});
