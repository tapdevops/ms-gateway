/**
 * Microservices Gateway
 *
 * @description :: Untuk mengatur microservice lainnya
 * @author      :: Ferdinand
 * @date        :: 06 November 2018
 */

require('express-group-routes'); 								// Express Group Routes
const express = require( 'express' );							// Import Express
const mongoose = require( 'mongoose' );							// Import Mongoose
const bodyParser = require( 'body-parser' ); 					// Import Body Parser
const Client = require('node-rest-client').Client; 				// Import REST Client
let bcrypt = require( 'bcryptjs' ); 							// Import Bcrypt
let jwt = require( 'jsonwebtoken' ); 							// Import JSON Web Token
let bearerToken = require( 'express-bearer-token' ); 			// Import Express Bearer Token
const app = express(); 											// Define App
const config = require( './config/config.js' ); 				// Config
const dbConfig = require( './config/database.js' ); 			// Database Config

// Setup Database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect( dbConfig.url, {
	useNewUrlParser: true,
	ssl: true
} ).then( () => {
	console.log( 'Successfully connected to the Database' );
} ).catch( err => {
	console.log( 'Could not connect to the Database. Exiting application.' )
} );

// Parse request of content-type - application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false } ) );

// Parse request of content-type - application/json
app.use( bodyParser.json() );

// Server Running Message
app.listen( config.app_port, () => {
	console.log( config.app_name + ' running on ' + config.app_port )
} );

// Login
app.post( '/api/login', ( req, res ) => {

	if ( req.body.username && req.body.password ) {

		var client = new Client();
		var url = config.url.microservices.ldap;
		var args = {
			data: {
				username: req.body.username,
				password: req.body.password
			},
			headers: { "Content-Type": "application/json" }
		};
		
		// 1. Check ke LDAP
		client.post( url, args, function ( data, response ) {
			// 2.1. Kondisi data terdapat pada LDAP
			if ( data.status == true ) {

				const loginModel = require( './app/models/login.js' );
				const loginData = {};

				const employeeHRIS = require( './app/models/employeeHRIS.js' );
				const userAuth = require( './app/models/userAuth.js' );
				const pjs = require( './app/models/pjs.js' );

				employeeHRIS.findOne( { 
					EMPLOYEE_USERNAME: req.body.username
				} ).then( data => {

					var imei_bayangan = '12345-00000-22232-22121';
					let token = jwt.sign( { username: req.body.username }, config.secret_key, { expiresIn: '24h' } );
					// LOGIN via PJS
					if( !data ) {
						pjs.findOne( { 
							USERNAME: req.body.username
						} ).then( data => {
							if ( !data ) {
								return res.status( 404 ).send({
									status: false,
									message: "User tersebut belum terdaftar",
									data: {}
								});
							}

							// Kondisi data ada di PJS
							res.json({
								status: true,
								message: "Success PJS",
								data: {
									ACCESS_TOKEN: token,
									USERDATA: {
										EMPLOYEE_NIK: data.EMPLOYEE_NIK,
										USERNAME: data.USERNAME,
										NAMA_LENGKAP: data.NAMA_LENGKAP,
										JOB_CODE: data.JOB_CODE
									}
								}
							})
						} ).catch( err => {
							if( err.kind === 'ObjectId' ) {
								return res.status( 404 ).send({
									status: false,
									message: "Error retrieving user 4",
									data: {}
								});
							}
							return res.status( 500 ).send({
								status: false,
								message: "Error retrieving user 3",
								data: {}
							} );
						} );
					}

					// LOGIN via Employee HRIS
					else {
						var data_hris = data;
						console.log(data_hris.EMPLOYEE_NIK);
						userAuth.findOne( { 
							EMPLOYEE_NIK: data_hris.EMPLOYEE_NIK
							} ).then( data_auth => {
								if ( !data_auth ) {
									return res.status( 404 ).send({
										status: false,
										message: "User tersebut belum terdaftar (AUTH1)",
										data: {}
									});
								}

								// Kondisi data ada di PJS
								res.json({
									status: true,
									message: "Success",
									userdata: {
										USERNAME: data_hris.EMPLOYEE_USERNAME,
										NIK: data_hris.EMPLOYEE_NIK,
										ACCESS_TOKEN: token,
										JOB_CODE: data_hris.EMPLOYEE_POSITION,
										USER_AUTH_CODE: data_auth.USER_AUTH_CODE,
										USER_ROLE: data_auth.USER_ROLE,
										REFFERENCE_ROLE: data_auth.REFFERENCE_ROLE,
										LOCATION_CODE: data_auth.LOCATION_CODE
									}
									
								})
							} ).catch( err => {
								if( err.kind === 'ObjectId' ) {
									return res.status( 404 ).send({
										status: false,
										message: "Error retrieving user 4zzz",
										data: {}
									});
								}
								return res.status( 500 ).send({
									status: false,
									message: "Error retrieving user 3zzz",
									data: {}
								} );
							} );

						
					}

				} ).catch( err => {
					if( err.kind === 'ObjectId' ) {
						return res.status( 404 ).send({
							status: false,
							message: "Error retrieving user 2",
							data: {}
						});
					}
					return res.status( 500 ).send({
						status: false,
						message: "Error retrieving user 1",
						data: {}
					} );
				} );
				
			}
			// 2.2. Kondisi false, data tidak ada di LDAP
			else {
				res.status( 403 ).send( {
					status: false,
					message: 'Username/Password anda salah.',
					data: {}
				} );
			}
		
		});
	}
	else {
		res.status( 400 ).send( {
			status: false,
			message: 'Periksa inputan anda',
			data: {}
		} );
	}
} );

app.get( '/', ( req, res ) => {
	res.json( { 'message': config.app_name } )
} );

// Routes
require( './routes/route.js' )( app );

// Set Login
// Create or update data
function setLogin( employee_nik, username, access_token, imei ) {

	const loginModel = require( './app/models/login.js' );
	loginModel.findOne( { 
		USERNAME: 'ferdinand' 
	} ).then( data => {
		if( !data ) {
			return 'Failed';
		}
		return data.USERNAME;
		console.log(data.USERNAME);

		/*
		// Kondisi belum ada data, create baru dan insert ke Sync List
		if( !data ) {

			const block = new loginModel( {
				REGION_CODE: req.body.REGION_CODE || "",
				COMP_CODE: req.body.COMP_CODE || "",
				EST_CODE: req.body.EST_CODE || "",
				WERKS: req.body.WERKS || "",
				AFD_CODE: req.body.AFD_CODE || "",
				BLOCK_CODE: req.body.BLOCK_CODE || "",
				BLOCK_NAME: req.body.BLOCK_NAME || "",
				WERKS_AFD_BLOCK_CODE: req.body.WERKS_AFD_BLOCK_CODE || "",
				LATITUDE_BLOCK: req.body.LATITUDE_BLOCK || "",
				LONGITUDE_BLOCK: req.body.LONGITUDE_BLOCK || "",
				START_VALID: ( req.body.START_VALID != '' ) ? date.parse( req.body.START_VALID, 'YYYY-MM-DD HH:mm:ss' ) : "",
				END_VALID: ( req.body.END_VALID != '' ) ? date.parse( req.body.END_VALID, 'YYYY-MM-DD HH:mm:ss' ) : "",
				INSERT_USER: req.body.INSERT_USER || "",
				INSERT_TIME: ( req.body.INSERT_TIME != '' ) ? date.parse( req.body.INSERT_TIME, 'YYYY-MM-DD HH:mm:ss' ) : "",
				UPDATE_USER: req.body.UPDATE_USER || "",
				UPDATE_TIME: ( req.body.UPDATE_TIME != '' ) ? date.parse( req.body.UPDATE_TIME, 'YYYY-MM-DD HH:mm:ss' ) : "",
				FLAG_UPDATE: dateAndTimes.format( new Date(), 'YYYYMMDD' )
			} );

			block.save()
			.then( data => {
				console.log(data);
				res.send({
					status: true,
					message: 'Success 2',
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
		// Kondisi data sudah ada, check value, jika sama tidak diupdate, jika beda diupdate dan dimasukkan ke Sync List
		else {
			
			if ( data.BLOCK_NAME != req.body.BLOCK_NAME || data.AFD_NAME != req.body.AFD_NAME ) {
				blockModel.findOneAndUpdate( { 
					WERKS_AFD_BLOCK_CODE: req.body.WERKS_AFD_BLOCK_CODE
				}, {
					BLOCK_NAME: req.body.BLOCK_NAME || "",
					LATITUDE_BLOCK: req.body.LATITUDE_BLOCK || "",
					LONGITUDE_BLOCK: req.body.LONGITUDE_BLOCK || "",
					START_VALID: ( req.body.START_VALID != '' ) ? date.parse( req.body.START_VALID, 'YYYY-MM-DD' ) : "",
					END_VALID: ( req.body.END_VALID != '' ) ? date.parse( req.body.END_VALID, 'YYYY-MM-DD' ) : "",
					INSERT_USER: req.body.INSERT_USER || "",
					INSERT_TIME: ( req.body.INSERT_TIME != '' ) ? date.parse( req.body.INSERT_TIME, 'YYYY-MM-DD HH:mm:ss' ) : "",
					UPDATE_USER: req.body.UPDATE_USER || "",
					UPDATE_TIME: ( req.body.UPDATE_TIME != '' ) ? date.parse( req.body.UPDATE_TIME, 'YYYY-MM-DD HH:mm:ss' ) : "",
					FLAG_UPDATE: dateAndTimes.format( new Date(), 'YYYYMMDD' )
				}, { new: true } )
				.then( data => {
					if( !data ) {
						return res.status( 404 ).send( {
							status: false,
							message: "Data error updating 2 " + req.body.WERKS_AFD_BLOCK_CODEs,
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
						return res.status( 404 ).send( {
							status: false,
							message: "Data not found 2",
							data: {}
						} );
					}
					return res.status( 500 ).send( {
						status: false,
						message: "Data error updating",
						data: {}
					} );
				});
			}
			else {
				res.send( {
					status: true,
					message: 'Skip Update',
					data: {}
				} );
			}
		}*/
		
	} ).catch( err => {
		if( err.kind === 'ObjectId' ) {
			console.log( 'Data not found 1' );
		}
		console.log( 'Error retrieving Datazz' );
	} );
}