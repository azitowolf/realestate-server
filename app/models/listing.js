var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ListingSchema = new Schema({
  id: Number,
  images: Array,
  rent: Number,
  agent: {
      name: String,
      phone: String,
      type: String
  },
  address: String,
  district: String,
  city: String,
  sqm: Number,
  beds: Number,
  baths: Number,
  description: String,
  dateAdded: {
      day: Number,
      month: Number,
      year: Number
  },
  compound: String,
  floor: String,
  buildingType: String,
  description_en: String,
  address_en: String,
  district_en: String,
  buildingType_en: String,
  city_en: String
});

mongoose.model('Listing', ListingSchema);

