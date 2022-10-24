const { ObjectId } = require("mongodb");
const Product = require("../Database/Product")

class Product_Service{

   async List(user,page,limit){
        if(!user||user=="Guest"){return [{Name:"P1"}]}
        let product = new Product();

        // return await product.find({Quantity:9,Description:"Any Text 4"});
        return await product.find();
    }
    async One(id){
        let product = new Product();
        return await product.viewone({_id:ObjectId(id)});
    }
    async update(id,params){
        let product = new Product();
        // return await product.updateone({_id:ObjectId(id)},params);
        return await product.updateone(id,params);
    }
    async delete(id){
        let product = new Product();
        // return await product.updateone({_id:ObjectId(id)},params);
        return await product.deleteone(id);
    }

}


module.exports={
    Product_Service
}