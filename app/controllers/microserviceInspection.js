const Client = require('node-rest-client').Client; 				// Import REST Client
const config = require( '../../config/config.js' );
let jwt = require( 'jsonwebtoken' );
const uuid = require( 'uuid' );
const nJwt = require( 'njwt' );

exports.find = async ( req, res ) => {
	nJwt.verify( req.token, config.secret_key, config.token_algorithm, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			var client = new Client();
			var url = config.url.microservices.inspection;
			var args = {
				headers: { "Content-Type": "application/json" }
			};

			client.get( url, args, function (data, response) {
				// parsed response body as js object
				res.json( { data } );
			});
		}
	} );
};

exports.create = async ( req, res ) => {
	nJwt.verify( req.token, config.secret_key, config.token_algorithm, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			var client = new Client();
			var url = config.url.microservices.inspection;
			var args = {
				data: req.body,
				headers: { "Content-Type": "application/json" }
			};

			client.post( url, args, function ( data, response ) {
				res.json( { data } );
			});
		}
	} );
}