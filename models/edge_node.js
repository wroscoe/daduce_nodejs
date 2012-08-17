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


// A group of all the connected edges for a specific node
var edgeGroupSchema = new Schema({
    node_id:  String,
    type: String,
    edges: [edgeSchema],
    created: {type: Date, default: Date.now}
});

exports.EdgeGroup = mongoose.model('EdgeGroup', edgeGroupSchema);
exports.Edge = mongoose.model('Edge', edgeSchema);