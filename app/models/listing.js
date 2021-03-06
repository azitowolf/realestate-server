var mongoose = require('mongoose'),
  AgentSchema = require('./agent'),
  Schema = mongoose.Schema;

var ListingSchema = new Schema({
  id: Number,
  images: Array,
  rent: Number,
  agent: {type: [AgentSchema]},
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
  isAvailable: Boolean,
  availabilityLastUpdated: String,
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

module.exports = mongoose.model('Listing', ListingSchema);

