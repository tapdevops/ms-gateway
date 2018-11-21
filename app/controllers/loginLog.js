const loginLogModel = require( '../models/loginLog.js' );
const dateFormat = require( 'dateformat' );
var querystring = require('querystring');
var url = require( 'url' );
const date = require( '../libraries/date.js' );
const dateAndTimes = require( 'date-and-time' );
let jwt = require( 'jsonwebtoken' );
const config = require( '../../config/config.js' );

// Create and Save new Data
exports.create = ( req, res ) => {

	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
		if ( err ) {
			res.send({
				status: false,
				message: 'Token expired!',
				data: {}
			});
		}
		else {
			if( !req.body.USER_AUTH_CODE || !req.body.EMPLOYEE_NIK || !req.body.USERNAME || !req.body.IMEI ) {
				return res.status( 400 ).send({
					status: false,
					message: 'Invalid input',
					data: {}
				});
			}

			const loginLog = new loginLogModel({
				USER_AUTH_CODE: req.body.USER_AUTH_CODE || "",
				ACCESS_TOKEN: req.token || "",
				EMPLOYEE_NIK: req.body.EMPLOYEE_NIK || "",
				USERNAME: req.body.USERNAME || "",
				IMEI: req.body.IMEI || "",
				DATE_LOGIN: new Date()
			});

			loginLog.save()
			.then( data => {
				res.send({
					status: true,
					message: 'Success',
					data: {}
				});
			} ).catch( err => {
				res.status( 500 ).send( {
					status: false,
					message: 'Some error occurred while creating data',
					data: {}
				} );
			} );
		}
	} );
	
};