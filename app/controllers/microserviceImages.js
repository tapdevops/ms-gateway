const Client = require( 'node-rest-client' ).Client;
const fs = require( 'file-system' );
const request = require( 'request' );
const config = require( '../../config/config.js' );
let jwt = require( 'jsonwebtoken' );
const uuid = require( 'uuid' );
const nJwt = require( 'njwt' );

// FINDING - CREATE
exports.create = async ( req, res ) => {
	
	
	nJwt.verify( req.token, config.secret_key, config.token_algorithm, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			var client = new Client();
			var url = config.url.microservices.images + '/description';
			var args = {
				data: req.body,
				headers: { 
					"Content-Type": "application/json",
					"Authorization": req.headers.authorization
				}
			};

			client.post( url, args, function ( data, response ) {
				res.json( { data } );
			});
		}
	} );
	
}