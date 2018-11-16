const loginLogModel = require( '../models/loginLog.js' );
exports.test = ( req, res ) => {
	loginLogModel.find({USER_AUTH_CODE:'TAC00004'}).count()
	.then( data => {
		
	} ).catch( err => {
		console.log( 'Set Log Login' );
	} );
	
	
}