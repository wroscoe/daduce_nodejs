
/**
 * Module dependencies.

TODO
1. How to decrease screen resolution
2. How to increase mouse speed
3. Javascript tutorial how to import functions
4. look up file structure node models
watch graphical mongodb implementation video
2. define data structure for graph
* Read v8 json documentation: how to confert json to javascript object
3. write example graph in .json file
4. send json to website
5. create json from form input
6. create mongodb

 */
 
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , format = require('util').format
  , json_functions = require('./json_functions');


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


app.param('user', function(req, res, next, id){
  if (req.user = 3333) {
    next();
  } else {
    next(new Error('failed to find user'));
  }
});

app.get('/', routes.index);

app.get('/from_function', function(req, res){
    //res.send('user ' + 45);
   res.send('user' + json_functions.from_function() );
});

app.get('from_json', function(req,res){
	res.send(json_functions.from_json);
});

app.get('/form', function(req, res){
  res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>Title: <input type="text" name="title" /></p>'
    + '<p>Image: <input type="file" name="image" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');
});

app.post('/form', function(req, res, next){
  // the uploaded file can be found as `req.files.image` and the
  // title field as `req.body.title`
  res.send(format('\nuploaded %s (%d Kb) to %s as %s'
    , req.files.image.name
    , req.files.image.size / 1024 | 0 
    , req.files.image.path
    , req.body.title));
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
