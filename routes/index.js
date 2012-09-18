
var ModelModule = require ('../models/edge_node')
var Config = require ('../config')
var Node = ModelModule.Node
var Edge = ModelModule.Edge

conf = new Config()

//INDEX
exports.index = function(req, res){
    var path = 'index.html';
    console.log("path used for sendFile" & path);
    res.sendfile(conf.static_path , "index.html")
};

exports.dev =function(req,res){
	res.render('index', { title: 'Express', var2:'34'});
}

//NODES
exports.view_createNode = function(req, res){
  //TODO make this an edit function if the node is specified
  res.render('create_node', {title:'Create Node'})
};

exports.createNode = function(req, res){
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

exports.searchNodes = function(req, res){
	console.log('searchNodes req.param = ' + req.param )
	
	if (typeof(req.param('keyword')) != 'undefined') 
		{	// FIND edges matching node id @ ./edge?node_id=#
			
			var patt=new RegExp(req.param('keyword'), "i");
 			Node.find({'label': patt}, function(err, node) {
 			res.send({msg:'Node Found', node:node})
 			});
		}
};
 

//Return all edge groups containing all edges for one node. 
exports.connectedNodes = function(req, res){
	console.log('connectedNodes...')
	console.log('req.params.id  ' + req.params.id);
	Edge.find({'A_id':req.params.id}, function (err, edges){
	//Edge.find({}, function (err, e){
		console.log(edges)
		res.send({msg:'Edges fouededges '})
	});
	
};

exports.viewConnectedNodes = function(req, res){
	console.log('viewConnectedNodes...')
	console.log('req.params.id  ' + req.params.id);
  	res.render('connected_nodes', {focus_node_id:req.params.id});
};

//TODO: Check if this works
exports.countNodes = function(req, res){
	console.log('countNodes: counting....' )
	
	var patt=new RegExp(req.param('keyword'), "i");
	Node.count({'label': patt}, function(err, count) {
		res.send({msg:'Nodes Counted', count:count})
	});

};

//  ------------------------------  EDGES  ---------------------------------------------

//Display the create edge form
exports.view_createEdge = function(req, res){
  //TODO make this an edit function if the node is specified
  res.render('create_edge', {title:'Create Edge'})
};

//Create a new edge, save the edge to the target and source edge groups.
exports.createEdge = function(req, res){

	//Find edge or create one. 
	Edge.findOne({'source_node_id':req.body.source_node_id, 'target_node_id':req.body.target_node_id, 'type':req.body.type},function(err,edge){
		if (edge == null){
			forward_edge = new Edge({
				'A_id':req.body.A_id,
				'B_id':req.body.B_id,
				'type': req.body.type,
				'B_label': req.body.B_label, //the target node Label
				'A_label': req.body.A_label,
				'weight': 1,
				'dir':1
			})
			forward_edge.save();
			console.log("Forward Edge Created: " + forward_edge);
			res.send({msg:'Edge Created'})
		}
		else{
			res.send({msg:'Edge already exists', body:req.body})
		}


	})
}



