const employeeHRISModel = require( '../models/employeeHRIS.js' );
const dateFormat = require( 'dateformat' );
var querystring = require('querystring');
var url = require( 'url' );
const date = require( '../libraries/date.js' );

// Create or update data
exports.createOrUpdate = ( req, res ) => {
	
	if( !req.body.EMPLOYEE_NIK || !req.body.USERNAME || !req.body.NAMA_LENGKAP || !req.body.JOB_CODE ) {
		return res.status( 400 ).send({
			status: false,
			message: 'Invalid input',
			data: {}
		});
	}

	const employeeHRIS = new employeeHRISModel( {
		EMPLOYEE_NIK: req.body.EMPLOYEE_NIK || "",
		USERNAME: req.body.USERNAME || "",
		NAMA_LENGKAP: req.body.NAMA_LENGKAP || "",
		JOB_CODE: req.body.JOB_CODE || "",
		INSERT_USER: req.body.INSERT_USER || "",
		INSERT_TIME: ( req.body.INSERT_TIME != '' ) ? date.parser( req.body.INSERT_TIME, 'YYYY-MM-DD HH:mm:ss' ) : "",
		UPDATE_USER: req.body.UPDATE_USER || "",
		UPDATE_TIME: "",
		DELETE_USER: req.body.DELETE_USER || "",
		DELETE_TIME: ""
	} );

	employeeHRIS.save()
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