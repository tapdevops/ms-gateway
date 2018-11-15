const pjsLogModel = require( '../models/pjsLog.js' );
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
			res.sendStatus( 403 );
		}
		else {
			if( !req.body.EMPLOYEE_NIK || !req.body.PROSES ) {
				return res.status( 400 ).send({
					status: false,
					message: 'Invalid input',
					data: {}
				});
			}

			const pjsLog = new pjsLogModel({
				EMPLOYEE_NIK: req.body.EMPLOYEE_NIK || "",
				PROSES: req.body.PROSES || "",
				INSERT_USER: req.body.INSERT_USER || "",
				INSERT_TIME: req.body.INSERT_TIME || "",
			});

			pjsLog.save()
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