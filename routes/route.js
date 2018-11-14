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
	const microserviceInspection = require( '../app/controllers/microserviceInspection.js' );
	const microserviceMasterdata = require( '../app/controllers/microserviceMasterdata.js' );
	const employeeHRIS = require( '../app/controllers/employeeHRIS.js' );

	// Routing: Auth
	//app.post( '/api/login', auth.login );
	//app.get( '/api/test', verifyToken, auth.test );

	// ROUTE - INSPECTION
	app.get( '/api/inspection', verifyToken, microserviceInspection.find );
	app.post( '/api/inspection', verifyToken, microserviceInspection.create );

	// ROUTE - MASTERDATA BLOCK
	app.get( '/api/masterdata/block', verifyToken, microserviceMasterdata.blockFind );
	app.get( '/api/masterdata/block/:id', verifyToken, microserviceMasterdata.blockFindOne );
	app.post( '/api/masterdata/block', verifyToken, microserviceMasterdata.blockCreate );
	app.put( '/api/masterdata/block/:id', verifyToken, microserviceMasterdata.blockUpdate );
	app.delete( '/api/masterdata/block/:id', verifyToken, microserviceMasterdata.blockDelete );
	
	// ROUTE - MASTERDATA AFDELING
	app.get( '/api/masterdata/afdeling', verifyToken, microserviceMasterdata.afdelingFind );
	app.get( '/api/masterdata/afdeling/:id', verifyToken, microserviceMasterdata.afdelingFindOne );
	app.post( '/api/masterdata/afdeling', verifyToken, microserviceMasterdata.afdelingCreate );
	app.put( '/api/masterdata/afdeling/:id', verifyToken, microserviceMasterdata.afdelingUpdate );
	app.delete( '/api/masterdata/afdeling/:id', verifyToken, microserviceMasterdata.afdelingDelete );

	// ROUTE - EMPLOYEE HRIS
	app.post( '/sync/employee-hris', employeeHRIS.createOrUpdate );


}