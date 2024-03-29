
var ModelModule = require ('../models/edge_node')
var Config = require ('../config')
var Node = ModelModule.Node
var Edge = ModelModule.Edge

var util = require('util')
var exec = require('child_process').exec;

exports.git_update_static = function(req, res){
	function puts(error, stdout, stderr) { 
		res.send(util.puts(stdout)); 
	};
	
	//exec("ls",puts);
	exec("rm -R ~/daduce_static", puts);
	exec("mkdir ~/daduce_static", puts);
	exec("git clone git@github.com:wroscoe/daduce_static.git ~/daduce_static", puts);

}

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
exports.renderCreateNode = function(req, res){
  //TODO make this an edit function if the node is specified
  res.render('create_node', {title:'Create Node'})
};

exports.postNode = function(req, res){
	//res.send(req.body)
  node = new Node({
  		'label':req.body.label, 
  		'description':req.body.description,
  		'image_url':req.body.image_url
  	});
  node.save()
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(node) //Does not render as JSON in chrome?
  };

exports.getNode = function(req, res){
	if (typeof(req.params.id) != 'undefined') 
		{	// FIND one node @ ./node/id
			Node.findOne({_id:req.params.id}, function(err, node) {
				console.log('nodeid' + req.params.id)
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.send(node);
			});
		}
	else
		{	//ERROR: No node id was given.
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.send({error:"No node id submitted"});
			console.log({error:"No node id submitted"})
		}
};

exports.searchNodes = function(req, res){
	console.log('searchNodes req.param = ' + req.param )
	
	if (typeof(req.param('p')) == 'undefined') 
		{ var p = 0}
	else
		{ var p = req.param('p')};
	
	if (typeof(req.param('keyword')) != 'undefined') 
		{	// FIND edges matching node id @ ./edge?node_id=#
			
			var patt=new RegExp(req.param('keyword'), "i");
 			Node.find({'label': patt}).skip(p).limit(p+20).execFind(function(err, nodes) {
 			res.setHeader("Access-Control-Allow-Origin", "*");
 			res.send({nodes:nodes})
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
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.send({edges:edges})
	});
	
};

exports.view_connectedNodes = function(req, res){
	console.log('viewConnectedNodes...')
	console.log('req.params.id  ' + req.params.id);
  	res.render('connected_nodes', {focus_node_id:req.params.id});
};

exports.countNodes = function(req, res){
	console.log('countNodes: counting....' )
	
	var patt=new RegExp(req.param('keyword'), "i");
	Node.count({'label': patt}, function(err, count) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.send({msg:'Nodes Counted', count:count})
	});

};

//  ------------------------------  EDGES  ---------------------------------------------

//Display the create edge form
exports.createEdge = function(req, res){
  //TODO make this an edit function if the node is specified
  res.render('create_edge', {title:'Create Edge'})
};

//Create a new edge, save the edge to the target and source edge groups.
exports.post_createEdge = function(req, res){

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
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.send({msg:'Edge already exists', body:req.body})
		}


	})
}

exports.countEdges = function(req, res){
	console.log('countEdges: counting....' )
	
	var patt=new RegExp(req.param('keyword'), "i");
	Edge.count({'label': patt}, function(err, count) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.send({msg:'Edges Counted', count:count})
	});

};

