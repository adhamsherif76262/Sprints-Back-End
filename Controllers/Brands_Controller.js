class Brands_Controller{

    Display(req,res){
        res.json({
        list:[{Name:"Brand 1"}]
        });
    }
    Create(req,res){
        res.json({
        message:"The Brand Has Been Added Succssefully"
        });
    }
    Update(req,res){
        res.json({
            message:"The Brand Has Been Updated Succssefully"
        });
    }
    Delete(req,res){
        res.json({
            message:"The Brand Has Been Deleted Succssefully"
        });
    }
}

module.exports={
    Brands_Controller
}