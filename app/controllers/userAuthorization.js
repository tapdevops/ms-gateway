const userAuthorizationModel = require( '../models/userAuthorization.js' );
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

	url_query = req.query;
	var url_query_length = Object.keys( url_query ).length;

	userAuthorizationModel.find( url_query )
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
};

exports.createOrUpdate = ( req, res ) => {
		
	nJwt.verify( req.token, config.secret_key, config.token_algorithm, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {

			if( !req.body.PARAMETER_NAME || !req.body.MODULE_CODE ) {
				return res.send({
					status: false,
					message: 'Invalid input',
					data: {}
				});
			}

			var auth = jwtDecode( req.token );

			userAuthorizationModel.findOne( { 
				PARAMETER_NAME: req.body.PARAMETER_NAME,
				MODULE_CODE: req.body.MODULE_CODE
			} ).then( data => {

				// Kondisi belum ada data, create baru dan insert ke Sync List
				if( !data ) {

					const set = new userAuthorizationModel( {
						MODULE_CODE: req.body.MODULE_CODE,
						PARAMETER_NAME: req.body.PARAMETER_NAME,
						STATUS: req.body.STATUS,
						NO_URUT: req.body.NO_URUT,
						INSERT_USER: auth.USER_AUTH_CODE || "",
						INSERT_TIME: new Date().getTime(),
						UPDATE_USER: auth.USER_AUTH_CODE || "",
						UPDATE_TIME: new Date().getTime(),

						DELETE_USER: "",
						DELETE_TIME: ""
					} );
					
					set.save()
					.then( data => {
						res.send({
							status: true,
							message: 'Success 2',
							data: {}
						});
					} ).catch( err => {
						res.send( {
							status: false,
							message: 'Some error occurred while creating data',
							data: {}
						} );
					} );
				}
				// Kondisi data sudah ada, check value, jika sama tidak diupdate, jika beda diupdate dan dimasukkan ke Sync List
				else {
					userAuthorizationModel.findOneAndUpdate( { 
						PARAMETER_NAME: req.body.PARAMETER_NAME,
						MODULE_CODE: req.body.MODULE_CODE
					}, {
						STATUS: req.body.STATUS,
						NO_URUT: req.body.NO_URUT,
						UPDATE_USER: auth.USER_AUTH_CODE || "",
						UPDATE_TIME: new Date().getTime()
					}, { new: true } )
					.then( data => {
						if( !data ) {
							return res.send( {
								status: false,
								message: "Data error updating 2",
								data: {}
							} );
						}
						else {
							res.send({
								status: true,
								message: 'Success',
								data: {}
							});
						}
					}).catch( err => {
						if( err.kind === 'ObjectId' ) {
							return res.send( {
								status: false,
								message: "Data not found 2",
								data: {}
							} );
						}
						return res.send( {
							status: false,
							message: "Data error updating",
							data: {}
						} );
					});
				}
				
			} ).catch( err => {
				if( err.kind === 'ObjectId' ) {
					return res.send({
						status: false,
						message: "Data not found 1",
						data: {}
					});
				}

				return res.send({
					status: false,
					message: "Error retrieving Data",
					data: {}
				} );
			} );
		}
	} );
};