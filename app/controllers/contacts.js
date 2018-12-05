const userAuthModel = require( '../models/userAuth.js' );
const dateFormat = require( 'dateformat' );
var querystring = require('querystring');
var url = require( 'url' );
const date = require( '../libraries/date.js' );
const dateAndTimes = require( 'date-and-time' );
let jwt = require( 'jsonwebtoken' );
const config = require( '../../config/config.js' );
const uuid = require( 'uuid' );
const nJwt = require( 'njwt' );
const jwtDecode = require( 'jwt-decode' );

// Retrieve and return all notes from the database.
exports.find = ( req, res ) => {
	nJwt.verify( req.token, config.secret_key, config.token_algorithm, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			var auth = jwtDecode( req.token );
			var find_condition = {};

			if ( auth.REFFERENCE_ROLE == 'NATIONAL' ) {
				find_condition = {
					REF_ROLE: 'NATIONAL'
				}
			}
			
			else if ( auth.REFFERENCE_ROLE == 'AFD_CODE' ) {
				find_condition = {
					REF_ROLE: 'AFD_CODE',
					LOCATION_CODE: auth.LOCATION_CODE
				}
			}
			
			else if ( auth.REFFERENCE_ROLE == 'BA_CODE' ) {
				find_condition = {
					REF_ROLE: 'AFD_CODE',
					LOCATION_CODE: auth.LOCATION_CODE
				}
			}

			userAuthModel.find( find_condition )
			.then( data => {
				if( !data ) {
					return res.send( {
						status: false,
						message: 'Data not found 2',
						data: {}
					} );
				}
				res.send( {
					status: true,
					message: 'Success',
					data: data
				} );
			} ).catch( err => {
				if( err.kind === 'ObjectId' ) {
					return res.send( {
						status: false,
						message: 'Data not found 1',
						data: {}
					} );
				}
				return res.send( {
					status: false,
					message: 'Error retrieving data',
					data: {}
				} );
			} );
		}
	} );
};










