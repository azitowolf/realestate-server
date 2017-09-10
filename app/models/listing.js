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

ListingSchema.index(
  {
    address: 'text',
    address_en: 'text',
    district: 'text',
    district_en: 'text',
    description: 'text',
    description_en: 'text'
  },
  {
    weights: {
      address: 10,
      address_en: 10,
      district: 5,
      district_en: 5,  
      description: 5,
      description_en: 5          
    },
    name: "TextIndex"
  }
);

mongoose.model('Listing', ListingSchema);

