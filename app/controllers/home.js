var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Listing = mongoose.model('Listing');

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


router.get('/api', function (req, res, next) {
  
  const from = req.query.from,
        to = req.query.to

    if(!from || !to) {
      return next(err)
    }

    Listing.find({id: { $gte: from, $lte: to }},function (err, listings) {
      console.log(listings)
      if (err) return next(err);
      res.send(listings);
    })

});

router.get('/api/listing/:id', function (req, res, next) {
  
  Listing.find({id:req.params.id},function (err, listings) {
    console.log(listings)
    if (err) return next(err);
    res.send(listings);
  })
});

router.get('*',function (err, req, res, next) {
  res.render('../views/error.jade', {message:"API ERROR", error:err})
});

