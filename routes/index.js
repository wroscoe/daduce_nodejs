
var Node = require ('../models/node')
var Edge = require ('../models/edge')

//INDEX
exports.index = function(req, res){
  res.render('index', { title: 'Express', var2:'34'});
};


//NODES
exports.createNode = function(req, res){
  //res.send("HELLO")
  res.render('create_node', { title: 'Express', var2:'34'});
};

exports.newNode = function(req, res){
  node = new Node({label:req.params.label, description:req.params.description});
  node.save
  res.send('node created!' + node._id);
};

exports.getNode = function(req, res){
  res.send("this is the getNode Page AND YOUR NODE ID" + req.params.id)
  res.render('create_node', { title: 'Express', var2:'34'});
};


//EDGES

exports.createEdge = function(req, res){
  //res.send("HELLO")
	var node = new Node ({label:req.params.label, description:req.params.description});
	node.save();
  	res.send('Your Node was saved' + node._id);
};


exports.getEdge = function(req, res){
  //res.send("this is the getEdge Page AND YOUR NODE ID" + req.params.node_id)
  //res.render('create_node', { title: 'Express', var2:'34'});
};


exports.getAllNodes = function(req, res){
	Node.find({}, function(err, doc) {
		console.log('looking for nodes')
		res.send([{node: doc}]);
	});

};
