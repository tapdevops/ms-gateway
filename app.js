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
							// Kondisi data ada di PJS
							res.json({
								status: true,
								message: "Success PJS",
								data: {
									ACCESS_TOKEN: token
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
						res.json({
							status: true,
							message: "Success HRIS",
							data: {
								ACCESS_TOKEN: token
							}
						})
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

				/*
				loginModel.findOne( { 
					USERNAME: req.body.username
				} ).then( data => {
					
					if( !data ) {
						return res.status( 404 ).send({
							status: false,
							message: "Data anda belum terdaftar dalam database, silahkan hubungi Administrator",
							data: {}
						});
					}

					logdata = {
						"USERNAME": data.USERNAME,
						"USER_AUTH_CODE": data.USER_AUTH_CODE,
						"EMPLOYEE_NIK": data.EMPLOYEE_NIK
					}

					let token = jwt.sign( { username: req.body.username }, config.secret_key, { expiresIn: '24h' } );

					console.log(logdata);

					res.send( {
						status: true,
						message: data.message,
						data: {
							token: token,
							login: logdata
						}
					} );

					console.log( '3' );

				} ).catch( err => {
					if( err.kind === 'ObjectId' ) {
						return res.status( 404 ).send({
							status: false,
							message: "Error retrieving user 2",
							data: {}
						});
						console.log( '2' );
					}
					console.log( '1' );
					return res.status( 500 ).send({
						status: false,
						message: "Error retrieving user",
						data: {}
					} );
				} );
				*/
				
			}
			// 2.2. Kondisi false, data tidak ada di LDAP
			else {
				res.status( 403 ).send( {
					status: false,
					message: 'Invalid credentials',
					data: {}
				} );
			}
		
		});
	}
	else {
		res.status( 400 ).send( {
			status: false,
			message: 'Authentication failed! Please check the request',
			data: {}
		} );
	}
} );

// Set Login
function setLogin( access_token, imei ) {
	
}

app.get( '/', ( req, res ) => {
	res.json( { 'message': config.app_name } )
} );

// Routes
require( './routes/route.js' )( app );

