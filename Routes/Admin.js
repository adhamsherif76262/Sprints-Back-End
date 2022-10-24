const Express = require( "express" );
const { Product_Controller } = require( "../Controllers/Product_Controller" );
const { Brands_Controller } = require( "../Controllers/Brands_Controller" );
const { Authentication_Controller } = require( "../Controllers/Authentication_Controller" );
const Admin_Middleware = require( "../Middlewares/Admin_Middleware" );

let Admin_App = Express();
Admin_App.use( Admin_Middleware );
let ProductController = new Product_Controller();
let BrandsController = new Brands_Controller();
let AuthenticationController = new Authentication_Controller();

Admin_App.get( "/Product", ProductController.Display );
Admin_App.post( "/Product", ProductController.Create );
Admin_App.put( "/Product/:id", ProductController.Update );
Admin_App.get( "/Product/:id", ProductController.View_One );
Admin_App.delete( "/Product/:id", ProductController.Delete );
Admin_App.put( "/Product/:id/Toggle_Status", ProductController.Change_Product_Status );

Admin_App.get( "/Brands", BrandsController.Display );
Admin_App.post( "/Brands", BrandsController.Create );
Admin_App.put( "/Brands/:id", BrandsController.Update );
Admin_App.delete( "/Brands/:id", BrandsController.Delete );

Admin_App.post( "/Auth/Login", AuthenticationController.Login );
Admin_App.post( "/Auth/Sign_Up", AuthenticationController.Sign_Up );
Admin_App.post( "/Auth/Forgot_Password", AuthenticationController.Forgot_Password );
Admin_App.post( "/Auth/Reset_Password", AuthenticationController.Reset_Password );

module.exports = Admin_App;