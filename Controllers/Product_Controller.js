const { ObjectId } = require("mongodb");
const { Insert_One } = require("../Database/Base");
const Product = require("../Database/Product");
const { Product_Service } = require("../Services/Product_Service");

class Product_Controller{

    async Display(req,res){
        let ProductService = new Product_Service();
        res.json({
        list:await ProductService.List(req.user,req.page,10)
        });
    }
    async View_One(req,res){
        const ID=req.params.id;
        let ProductService = new Product_Service();
        res.json({
        Product:await ProductService.One(ID)
        });
    }
    async Create(req,res){
        let product=new Product();
        let data=req.body;
        data.idDeleted=false;
        await product.InsertOne(req.body);
        console.log(req.body)
        res.json({
        message:"The Product Has Been Created Succssefully"
        });
    }
    async Update(req,res){
        const {id} = req.params;
        const {name, price, Quantity,Description,Status} = req.body;

        let service = new Product_Service();
        res.json({
            product: await service.update(id, {name, price, Quantity,Description,Status})
        });
    }
    async Delete(req,res){
        const {id} = req.params;
        let service = new Product_Service();
        await service.delete(id);
        res.json({
            message:"The Product Has Been Deleted Succssefully"
        });
    }
    async Change_Product_Status(req,res){
        let service = new Product_Service();
        const id = req.params.id;
        // let product = await service.One({_id:ObjectId(id)})
        let product = await service.One(id)
        if (!product)
            res.statusCode(400).json({
                message: "product not found"
            });
            
        let Status = "Active";
        if (!product.Status || product.Status != "Active"){Status = "Active";}
        else{Status = "In-Active";}
        // await service.update(id, {Status})
        await service.update(id,{Status})
        res.json({
            message:"The Product Status Has Been Changed Succssefully"
        });
    }
}

module.exports={
    Product_Controller
}

