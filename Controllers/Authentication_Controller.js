const { Users_Service } = require( "../Services/Users_Service" );

class Authentication_Controller {
    async Login( req, res ) {
        const { UserName, Password } = req.body;
        let userService = new Users_Service();
        let user = await userService.Login( UserName, Password )
        res.json( {
            user,
        } );
    }
    async Sign_Up( req, res ) {
        const { UserName, Password } = req.body;
        let userService = new Users_Service();
        let user = await userService.SignUp( UserName, Password )
        res.json( {
            user
        } );
        res.status( 777 );
    }
    Forgot_Password( req, res ) {
        res.json( {
            message: "Forgot Password Page"
        } );
    }
    Reset_Password( req, res ) {
        res.json( {
            message: "Reset Password Page"
        } );
    }
}

module.exports = {
    Authentication_Controller
}