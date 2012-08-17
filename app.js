
/**
 * Module dependencies.
 */
 
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , format = require('util').format
  , json_functions = require('./json_functions')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb16')

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
}); 

app.configure('development', function(){
  app.use(express.errorHandler());
});

//TEST if the MONGO server is working
mongoose.connection.on('open', function (ref) {
console.log('Connected to mongo server.');
});

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});

//NODES
app.get('/node/:id?', routes.getNode);
app.get('/create_node', routes.createNode);
app.post('/create_node', routes.newNode);
app.get('/search_node', routes.searchNode);
app.get('/connected_nodes/:id?', routes.getConnectedNodes);

//EDGES
app.get('/edge/:id?', routes.getEdge);
app.get('/create_edge', routes.createEdge);
app.post('/create_edge', routes.newEdge);

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
