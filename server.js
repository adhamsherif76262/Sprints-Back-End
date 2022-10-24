const Express = require( "express" );
const Path = require( "path" );
const Fs = require( "fs" ).promises;

let App = Express();

App.listen( 8080, function () {
    console.log( "The Application Is Listening On Port 8080" );
} )

// App.get("/",function(req,res){
//     Fs.readFile("index.html",function(err,data){
//         if(err){res.send("An Error Has Ocurred");}
//         res.send(data.toString("utf-8"));
//     })
// })
// App.get("/index.html",function(req,res){
//     Fs.readFile(Path.join(__dirname,"index.html"),function(err,data){
//         if(err){res.send("An Error Has Ocurred");}
//         res.send(data.toString("utf-8"));
//     })
// })

async function Get_User_By_Id( id ) {
    let Filtered_Users = ( await Read_User_Data() ).filter( ( item ) => item.id === id );
    if ( Filtered_Users.length > 0 ) { return Filtered_Users[ 0 ]; }
    return {};
}

async function Write_User_Data( username, age ) {
    let Old_Data_Object = await Read_User_Data();
    let id = Old_Data_Object.length + 1;
    Old_Data_Object.push( { id, username, age } );
    await Fs.writeFile( Path.join( __dirname, "users.json" ), JSON.stringify( Old_Data_Object ) );
}
async function Read_User_Data() {
    let Old_Data = await Fs.readFile( "users.json" );
    if ( Old_Data === "" || Old_Data === null || Old_Data === undefined || Old_Data === NaN ) { Old_Data = "[]"; }
    return JSON.parse( Old_Data );
}
async function Update_User( id, name, age ) {
    let Users_List = await Read_User_Data();
    let user = Users_List.filter( user => user.id == id )[ 0 ];
    user.username = name;
    user.age = age;
    await Fs.writeFile( Path.join( __dirname, "users.json" ), JSON.stringify( Users_List ) );

}
async function Delete_User( id ) {
    let Users_List = await Read_User_Data();
    Filtered_Users_List = Users_List.filter( user => {
        console.log( user.id != id )
        console.log( user.id )
        console.log( id )
        return user.id != id
    } );
    console.log( id );
    console.log( Filtered_Users_List );
    // delete Users_List[Users_List.indexOf(id-1)];
    await Fs.writeFile( Path.join( __dirname, "users.json" ), JSON.stringify( Filtered_Users_List ) );
    return Filtered_Users_List
}
App.get( "/index.html", async ( req, res ) => {
    // res.json({
    //     name:req.query.username,
    //     Age:23,
    //     Address:
    //     {
    //         "street_name":"asdasdasd",
    //         "street_number":22358,
    //         "state":"cairo"
    //     }
    // });
    let { username, age } = req.query;
    await Write_User_Data( username, age );
    res.json( { username, age } );
} );

App.get( "/login.html", function ( req, res ) {
    res.sendFile( Path.join( __dirname, "login.html" ), function ( err, data ) {
        if ( err ) { res.send( "An Error Has Ocurred" ); }
    } );
} );
App.get( "/Sign_Up.html", function ( req, res ) {
    res.sendFile( Path.join( __dirname, "signup.html" ), function ( err, data ) {
        if ( err ) { res.send( "An Error Has Ocurred" ); }
    } );
} );
App.get( "/About_Us.html/:id", async ( req, res ) => {
    let { id } = req.params;
    let user = await Get_User_By_Id( parseInt( id ) );
    res.json( { user } );
} );
App.get( "/Contact_Us.html/:id", async ( req, res ) => {
    let { id } = req.params;
    let { username, age } = req.query;
    let user = await Get_User_By_Id( parseInt( id ) );
    if ( !user.id ) { res.json( { message: "User Not Found" } ) }
    await Update_User( parseInt( user.id ), username, age )
    res.json( { user: await Get_User_By_Id( parseInt( user.id ) ) } );
} );
App.get( "/Monitors.html/:id", async ( req, res ) => {
    let { id } = req.params;
    if ( !id ) { res.json( { message: "User Not Found" } ) }
    let Users_List = await Delete_User( parseInt( id ) );
    console.log( Users_List )
    res.json( { Users_List } )
} );

