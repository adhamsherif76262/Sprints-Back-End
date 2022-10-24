const { Users_Service } = require("../Services/Users_Service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

// async function Compare(plain, hash) {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(plain, hash, (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         })
//     })
// }
async function Admin_Middleware(req,res,next){
    if (req.path == "/Auth/Sign_Up" || req.path == "/Auth/Login")
        return next();
    let token = req.headers["authorization"]
    let deco = jwt.verify(token, 'shhhhh')
    let US = new Users_Service()
    let user = await US.findById({_id:ObjectId(deco.id)});
    console.log(user);
    // user=null;
    if (!user){return res.status(401).json({message: "Unauthorized Access"});}
    req.user = user;
    next();
}

module.exports=Admin_Middleware;
