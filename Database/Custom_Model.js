const{Insert_One,View_All, ViewOne, Update, Delete_One}=require("./Base");

class Custom_Model{
    name;
    
    InsertOne(Data){
        return Insert_One(this.name,Data);
    }
    find(filter={}){
        return View_All(this.name,filter);
    }
    async viewone(id){
        try{return ViewOne(this.name,id)}
        catch(e){return null;}
        
    }
    async updateone(id,params){
        try{return Update(this.name,id,params)}
        catch(e){return null;}
        
    }
    async deleteone(id){
        // try{return Delete_One(this.name,id)}
        try{return Delete_One(this.name,id)}
        catch(e){return null;}
        
    }
}
module.exports=Custom_Model;