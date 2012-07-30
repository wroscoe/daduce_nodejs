var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var edgeSchema = new Schema({
    label:  String,
    type: String,
    target_node_id: String,
    source_node_id: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Edge', edgeSchema);