var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AgentSchema = new Schema({
    name: String,
    phone: String,
    type: String
});

module.exports = AgentSchema;

