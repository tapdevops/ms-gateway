function verifyToken( req, res, next ) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];

	if ( typeof bearerHeader !== 'undefined' ) {
		const bearer = bearerHeader.split( ' ' );
		const bearerToken = bearer[1];

		req.token = bearerToken;
		next();
	}
	else {
		// Forbidden
		res.sendStatus( 403 );
	}
}

module.exports = ( app ) => {
	// Declare Controllers
	//const auth = require( '../app/controllers/auth.js' );
	const inspection = require( '../app/controllers/inspection.js' );
	const masterdata = require( '../app/controllers/masterdata.js' );

	// Routing: Auth
	//app.post( '/api/login', auth.login );
	//app.get( '/api/test', verifyToken, auth.test );
	app.get( '/api/inspection', verifyToken, inspection.find );
	app.post( '/api/inspection', verifyToken, inspection.create );
}