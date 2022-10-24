const Express=require("express");
const { Product_Controller } = require("../Controllers/Product_Controller");
const Website_App=Express();
let ProductController = new Product_Controller();

Website_App.get("/Product",ProductController.Display);

module.exports=Website_App;