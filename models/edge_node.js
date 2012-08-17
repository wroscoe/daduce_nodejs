var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var edgeSchema = new Schema({
	source_node_id: String,
	target_node_id: String,
	source_label: String,
	target_label: String,
	type: String,
	label: String,
	weight: Number,
	dir: {type: Number, default: 1}, // 1 = forward, -1 = backward
	created: {type: Date, default: Date.now}
});


var nodeSchema = new Schema({
    label:  String,
    description: String,
    image_url: String,
    created: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'}
});
 
exports.Node = mongoose.model('Node', nodeSchema);
exports.Edge = mongoose.model('Edge', edgeSchema);