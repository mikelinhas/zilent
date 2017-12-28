/**
 * Module dependencies
 */

//Express
var express = require('express');
var app = express();

// other Dependencies
var morgan = require('morgan');
var path = require('path');
var ejslocals = require('ejs-locals');


//Middleware (used to be bundled with Express 3.0)
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));


/** 
 * Start Server
 */

app.listen(app.get('port'), '0.0.0.0', function() {
	console.log('Express server listening on port ' + app.get('port'));
});


/** 
 * Start Routing!
 */

var routes = require('./routes'); // Routes for our application
routes(app)
