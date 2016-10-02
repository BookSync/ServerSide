var express = require( 'express' );
var bodyparser = require( 'body-parser' );
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var configDB = require('./config/database.js');
var mongoose = require('mongoose');
var app = express();

// Set the port to listen to
app.set( 'port', ( process.env.PORT || 8080 ) );

//connect to db
mongoose.connect(configDB.url);

// configure to parse both json and url-encoded requests
app.use( bodyparser.urlencoded( {extended: true} ) );
app.use( bodyparser.json() );
app.use(cookieParser());
app.use(session({secret: 'booksyncsecret'}));
app.use(passport.initialize());
app.use(passport.session());

// setup passport strategy
require('./config/passport')(passport);

require('./routes')(app, passport);

app.listen( app.get('port'), function (error) {
  if ( error ) {
    console.error( error );
  } else { 
    console.info("Listening to port %s. Direct all requests at http://localhost:%s/ in your browser",app.get('port'), app.get('port'));
  }
} );
