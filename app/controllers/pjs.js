const pjsModel = require( '../models/pjs.js' );
const dateFormat = require( 'dateformat' );
var querystring = require('querystring');
var url = require( 'url' );
const date = require( '../libraries/date.js' );
const dateAndTimes = require( 'date-and-time' );
let jwt = require( 'jsonwebtoken' );
const config = require( '../../config/config.js' );
const uuid = require( 'uuid' );
const nJwt = require( 'njwt' );

// Create and Save new Data
exports.create = ( req, res ) => {

	nJwt.verify( req.token, config.secret_key, config.token_algorithm, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			if( !req.body.EMPLOYEE_NIK || !req.body.USERNAME ) {
				return res.status( 400 ).send({
					status: false,
					message: 'Invalid input',
					data: {}
				});
			}

			const pjs = new pjsModel({
				EMPLOYEE_NIK: req.body.EMPLOYEE_NIK || "",
				USERNAME: req.body.USERNAME || "",
				NAMA_LENGKAP: req.body.NAMA_LENGKAP || "",
				JOB_CODE: req.body.JOB_CODE || "",
				INSERT_USER: req.body.INSERT_USER || "",
				INSERT_TIME: req.body.INSERT_TIME || "",
				UPDATE_USER: req.body.UPDATE_USER || "",
				UPDATE_TIME: req.body.UPDATE_TIME || "",
				DELETE_USER: req.body.DELETE_USER || "",
				DELETE_TIME: req.body.DELETE_TIME || ""
			});

			pjs.save()
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