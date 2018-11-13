const syncListModel = require( '../models/syncList.js' );
var url = require( 'url' );
const date = require( '../libraries/date.js' );

// Create
exports.create = ( req, res ) => {
	
	if( !req.body.ID || !req.body.CODE || !req.body.TABLE_NAME) {
		return res.status( 400 ).send({
			status: false,
			message: 'Invalid input',
			data: {}
		});
	}

	const syncList = new syncListModel( {
		ID: req.body.ID || "",
		CODE: req.body.CODE || "",
		TABLE_NAME: req.body.TABLE_NAME || "",
		INSERT_TIME: ""
	} );

	syncList.save()
	.then( data => {
		res.send( {
			status: true,
			message: 'Success',
			data: {}
		} );
	} ).catch( err => {
		res.status( 500 ).send( {
			status: false,
			message: 'Some error occurred while creating data',
			data: {}
		} );
	} );
	
};