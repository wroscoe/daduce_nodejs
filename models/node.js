var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var nodeSchema = new Schema({
    label:  String,
    description: String,
    image_url: String,
    created: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'}
});

module.exports = mongoose.model('Node', nodeSchema);