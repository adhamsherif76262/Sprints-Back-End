const User = require( "../Database/User" )
const jwt = require( 'jsonwebtoken' );
const bcrypt = require( "bcrypt" );

class Users_Service {
    async Login( User_Name, Password ) {
        let User_Model = new User();
        let User_List = await User_Model.find( { UserName: User_Name } )
        let user = User_List[ 0 ];
        if ( User_List.length == 0 ) { return { status: false, message: "No Users Found" } }
        if ( user.UserName != User_Name ) { return { status: false, message: "User Name Is In-Correct" } }
        if ( !user.Is_Active ) { return { status: false, message: "User Is Not Active" } }
        console.log( user );
        let token = jwt.sign( { username: user.username, id: user._id }, 'shhhhh' );
        return { status: true, token };
    }
    async SignUp( UserName, Password ) {
        let userModel = new User();
        let Unique_User_Name = await this.checkUserName( UserName )
        if ( !Unique_User_Name )
            return new MessageEvent( "This User Name Is Already Taken" )
        
        return userModel.InsertOne( {
            UserName, Password, Is_Active: true
        } );
    }
    
    async checkUserName( UserName ) {
        let userModel = new User();
        let userList = await userModel.find( { UserName } );
        return userList.length > 0 ? false : true;
    }
    encrypt( password ) {
        return new Promise( ( resolve, reject ) => {
            bcrypt.hash( password, 10, ( err, hash ) => {
                if ( err ) return reject( err );
                resolve( hash );
            } )
        } );
    }
    async findById( authid ) {
        let userModel = new User();
        return userModel.find( authid );
    }
    // async makeAToken(user) {
    //     let header = {"alg": "HS256", "typ": "JWT"};
    //     let payload = {username: user.username, id: user._id};
    //     let sing = {};
    //     let partOneAndTwo = Buffer.from(JSON.stringify(header)).toString("base64") + "." 
    //                         + Buffer.from(JSON.stringify(payload)).toString("base64");
    //     let hash = await this.encrypt(partOneAndTwo)
    //     let token = partOneAndTwo + "." + Buffer.from(hash).toString("base64")
    //     return token;
    // }
}


module.exports = {
    Users_Service
}