
//node 1: 5021b5f653a727ae17000002
//node 2: 5021b61753a727ae17000003
//node 3: 5021b62b53a727ae17000004



var ModelModule = require ('../models/edge_node')
var Node = ModelModule.Node
var Edge = ModelModule.Edge


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

  res.send({msg:'Node Created!', node: [node]}) //Does not render as JSON in chrome?
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

exports.searchNode = function(req, res){
	
	console.log('searchNode req.param = ' + req.param )
	
	if (typeof(req.param('keyword')) != 'undefined') 
		{	// FIND edges matching node id @ ./edge?node_id=#
			
			var patt=new RegExp(req.param('keyword'), "i");
 			Node.find({'label': patt}, function(err, node) {
 			res.send({msg:'Node Found', node:node})
 			});
		}
};
 

//Return all edge groups containing all edges for one node. 
exports.getConnectedNodes = function(req, res){
	console.log('getConnectedNodes...')
	console.log('req.params.id  ' + req.params.id);
	Edge.find({'source_node_id':req.params.id}, function (err, e){
	//Edge.find({}, function (err, e){
		console.log(e)
		res.send({msg:'Edges found.', e: e})
	});
	
};

exports.viewConnectedNodes = function(req, res){
	console.log('viewConnectedNodes...')
	console.log('req.params.id  ' + req.params.id);
  	res.render('connected_nodes', {focus_node_id:req.params.id});
};

//  ------------------------------  EDGES  ---------------------------------------------

//Display the create edge form
exports.createEdge = function(req, res){
  //TODO make this an edit function if the node is specified
  res.render('create_edge', {title:'Create Edge'})
};

//Create a new edge, save the edge to the target and source edge groups.
exports.newEdge = function(req, res){

	//Find edge or create one. 
	Edge.findOne({'source_node_id':req.body.source_node_id, 'target_node_id':req.body.target_node_id, 'type':req.body.type},function(err,edge){
		if (edge == null){
			forward_edge = new Edge({
				'source_node_id':req.body.source_node_id,
				'target_node_id':req.body.target_node_id,
				'type': req.body.type,
				'target_label': req.body.target_label, //the target node Label
				'source_label': req.body.source_label,
				'weight': 1,
				'dir':1
			})
			forward_edge.save();
			console.log("Forward Edge Created: " + forward_edge);
		}
		else{
			res.send({msg:'Edge already exists'})
		}


	})
}



