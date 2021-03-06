//////////////////
// Requirements //
//////////////////
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var routes = require('./routes/index');
var user = require('./routes/user');
var config = require('./config');

var app = express();

///////////
// Setup //
///////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Environnment setup
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// Express setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

// Passport setup
require('./config/passport')(passport);
app.use(session({
	secret: 'japprecielesfruitsausirop',
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Sécurité sur le header
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'x-access-token');
	next();
});

////////////
// Routes //
////////////
app.use('/', routes);
app.use('/user', user);

////////////////////
// error handlers //
////////////////////

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err,
			title: 'error'
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {},
		title: 'error'
	});
});

module.exports = app;
