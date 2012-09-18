
/**
 * Module dependencies.
 */
 
var express = require('express')
  , routes = require('./routes')
  , config = require('./config')
  , http = require('http')
  , path = require('path')
  , format = require('util').format
  //, json_functions = require('./json_functions')
  , mongoose = require('mongoose');

conf = new config();

mongoose.connect(conf.db_path)

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || conf.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(conf.static_path));
}); 

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//TEST if the MONGO server is working
mongoose.connection.on('open', function (ref) {
console.log('Connected to mongo server.');
});

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});

//ADMIN
app.get('/git_update_static', routes.git_update_static);

//NODES
app.get('/node/:id?', routes.getNode);
app.get('/createNode', routes.view_createNode);
app.post('/createNode', routes.createNode);
app.get('/searchNodes', routes.searchNodes);
app.get('/connectedNodes/:id?', routes.connectedNodes);
app.get('/view_connectedNodes/:id?', routes.view_connectedNodes);
app.get('/countNodes', routes.countNodes);

//EDGES
app.get('/edge/:id?', routes.getEdge);
app.get('/view_createEdge', routes.view_createEdge);
app.post('/createEdge', routes.createEdge);

app.get('/', routes.index);
app.get('/dev', routes.dev);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
