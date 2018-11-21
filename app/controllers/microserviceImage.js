const Client = require('node-rest-client').Client;                              // Import REST Client
const config = require( '../../config/config.js' );
let jwt = require( 'jsonwebtoken' );

// IMAGE - CREATE
exports.imageCreate = async ( req, res ) => {
	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
			if ( err ) {
				res.sendStatus( 403 );
			}
			else {
				var client = new Client();
				var url = config.url.microservices.images;
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
