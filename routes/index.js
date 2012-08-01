
var Node = require ('../models/node')
var Edge = require ('../models/edge')

//INDEX
exports.index = function(req, res){
  res.render('index', { title: 'Express', var2:'34'});
};


//NODES
exports.createNode = function(req, res){
  //TODO make this an edit function if the node is specified
  res.render('create_node', {title:'Create Node'})
};

exports.newNode = function(req, res){
	//res.send(req.body)
  node = new Node({
  		'label':req.body.label, 
  		'description':req.body.description,
  		'image_url':req.body.image_url
  	});
  node.save()

  res.send({msg:'Node Created!', node: node})
};

exports.getNode = function(req, res){
	if (typeof(req.params.id) != 'undefined') 
		{	// FIND one node @ ./node/id
			Node.find({_id:req.params.id}, function(err, node) {
				console.log('nodeid' + req.params.id)
				res.send({msg:'Node Found', node:node});
			});
		}
	else
		{	//FIND ALL NODES @ ./node
			  	Node.find({}, function(err, node) {
					console.log('nodeid' + req.params.id)
					res.send({msg:'Node Found', node:node});
			});
		}
};


//  EDGES ---------------------------------------------

//TODO Create ability to create, edit and view edges. And connect nodes.

exports.createEdge = function(req, res){
  //TODO make this an edit function if the node is specified
  res.render('create_edge', {title:'Create Edge'})
};

exports.newEdge = function(req, res){
	//res.send(req.body)
  edge = new Edge({
  		'label':req.body.label, 
  		'type': req.body.type,
  		'description':req.body.description,
  		'target_node_id':req.body.target_node_id, 
  		'source_node_id':req.body.source_node_id
  	});
  edge.save()

  res.send({msg:'Edge Created!', edge: edge})
};

exports.getEdge = function(req, res){
	if (typeof(req.params.id) != 'undefined') 
		{	// FIND one Edge @ ./edge/id
			Edge.find({_id:req.params.id}, function(err, edge) {
				console.log('edgeid' + req.params.id)
				res.send({msg:'Edge Found', edge:edge});
			});
		}
	else
		{	//FIND ALL Edge @ ./edge
		  	Edge.find({}, function(err, edge) {
				console.log('edgeid' + req.params.id)
				res.send({msg:'Edge Found', edge:edge});
			});
		}
};

