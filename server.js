var express = require( 'express' );
var bodyparser = require( 'body-parser' );
var app = express();

// Set the port to listen to
app.set( 'port', ( process.env.PORT || 5000 ) );

// configure to parse both json and url-encoded requests
app.use( bodyparser.urlencoded( {extended: false} ) );
app.use( bodyparser.json() );

app.get( '/', function ( req, res ) {
  res.send( "Welcome to bookSync!" );
} );

app.listen( app.get('port'), function (error) {
  if ( error ) {
    console.error( error );
  } else { 
    console.info("Listening to port %s. Direct all requests at http://localhost:%s/ in your browser",app.get('port'), app.get('port'));
  }
} );
