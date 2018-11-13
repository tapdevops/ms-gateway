const loginModel = require( '../models/login.js' );
exports.dbCheck = async ( req, res ) => {


	var callback = {};

	var query = loginModel.find( { 'username': 'ferdinand' } );
	query.select( 'username' );
	query.exec(  callback );

	console.log( query );

	res.json( { message:'OK' } );
};