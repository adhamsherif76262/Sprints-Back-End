const Mongo = require( "mongodb" );
const Mongo_Client = Mongo.MongoClient;

function Mongo_Connect( url ) {
    return new Promise( ( resolve, reject ) => {
        Mongo_Client.connect( url, function ( error, db ) {
            if ( error ) { return reject( error ) }
            resolve( db )
        } )
    } );
}

function Insert_One( Collection_Name, Data ) {
    return new Promise( ( resolve, reject ) => {
        Mongo_Connect( "mongodb://localhost:27017" ).then( db => {
            const dbo = db.db( "E-Commerce" )
            dbo.collection( Collection_Name ).insertOne( Data, function ( error, result ) {
                if ( error ) { reject( error ); return; }
                resolve( result );
                db.close();
            } );
        } );
    } );
}

function View_All( Collection_Name, filter = {} ) {
    return new Promise( ( resolve, reject ) => {
        Mongo_Connect( "mongodb://localhost:27017" ).then( db => {
            const dbo = db.db( "E-Commerce" )
            dbo.collection( Collection_Name ).find( filter ).toArray( function ( error, result ) {
                if ( error ) { return reject( error ); }
                resolve( result );
                db.close();
            } );
        } );
    } );
}
function ViewOne( Collection_Name, filter = {} ) {
    return new Promise( ( resolve, reject ) => {
        Mongo_Connect( "mongodb://localhost:27017" ).then( db => {
            const dbo = db.db( "E-Commerce" )
            dbo.collection( Collection_Name ).findOne( filter, function ( error, result ) {
                if ( error ) { return reject( error ); }
                resolve( result );
                db.close();
            } );
        } );
    } );
}
function Update( Collection_Name, id, data ) {
    return new Promise( ( resolve, reject ) => {
        Mongo_Connect( "mongodb://localhost:27017" ).then( db => {
            const dbo = db.db( "E-Commerce" )
            dbo.collection( Collection_Name ).updateOne( { _id: Mongo.ObjectId( id ) }, { $set: data }, function ( error, result ) {
                if ( error ) { return reject( error ); }
                resolve( result );
                db.close();
            } );
        } );
    } );
}
function Delete_One( Collection_Name, id ) {
    return new Promise( ( resolve, reject ) => {
        Mongo_Connect( "mongodb://localhost:27017" ).then( db => {
            const dbo = db.db( "E-Commerce" )
            dbo.collection( Collection_Name ).deleteOne( { _id: Mongo.ObjectId( id ) }, function ( error, result ) {
                if ( error ) { return reject( error ); }
                resolve( result );
                db.close();
            } );
        } );
    } );
}
module.exports = {
    Mongo_Connect,
    Insert_One,
    View_All,
    ViewOne,
    Update,
    Delete_One
};