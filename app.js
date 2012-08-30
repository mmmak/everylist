
/**
 * Module dependencies.
 */

var express = require('express');
var ListProvider = require('./listprovider.mongodb').ListProvider;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('stylus').middleware({ src: __dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

// Routes

var listProvider = new ListProvider('localhost', 27017);

// show owners
app.get('/', function(req, res){
    listProvider.GetOwners( function(error,owners){
        res.send (owners);
    });
});

// show owners list
app.get('/owner/*/*', function (req, res) {
    listProvider.GetList (req.params[0], req.params[1], function (error, lists){
        res.send (lists);
    });
});

// show owners lists
app.get('/owner/*', function (req, res) {
    listProvider.GetLists (req.params[0], function (error, lists){
        res.send (lists);
    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
