const Express = require( "express" );
const Admin_App = require( "./Routes/Admin" );
const Website_App = require( "./Routes/Website" );
const App = Express();
const Body_Parser = require( "body-parser" );

App.use( Body_Parser.json() );
App.use( "/Admin", Admin_App );
App.use( "/Website", Website_App );

App.listen( 8090, function () {
    console.log( "The App Is Listening On Port 8090" );
} )

