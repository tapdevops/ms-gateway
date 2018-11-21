const Client = require('node-rest-client').Client; 				// Import REST Client
const config = require( '../../config/config.js' );
let jwt = require( 'jsonwebtoken' );

// AFDELING - FIND
exports.find = async ( req, res ) => {
	url_query = req.query;
	var url_query_length = Object.keys( url_query ).length;

	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			var client = new Client();
			var url = config.url.microservices.finding;

			if ( url_query_length > 0 ) {
				url = url + req._parsedUrl.search;
			}
			
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

// AFDELING - CREATE
exports.create = async ( req, res ) => {
	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			var client = new Client();
			var url = config.url.microservices.finding;
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

// AFDELING - FIND ONE
exports.findOne = async ( req, res ) => { 
	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			var client = new Client();
			var url = config.url.microservices.masterdata_afdeling + '/' + req.params.id;
			var args = {
				headers: { "Content-Type": "application/json" }
			};

			client.get( url, args, function (data, response) {
				res.json( { data } );
			});
		}
	} );
}

// AFDELING - UPDATE
exports.update = async ( req, res ) => { 
	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			var client = new Client();
			var url = config.url.microservices.finding + '/' + req.params.id;
			var args = {
				data: req.body,
				headers: { "Content-Type": "application/json" }
			};

			console.log(req.body);

			client.put( url, args, function ( data, response ) {
				res.json( { data } );
				console.log(data);
				console.log(response);
			});
		}
	} );
}

// AFDELING - DELETE
exports.delete = async ( req, res ) => { 
	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			var client = new Client();
			var url = config.url.microservices.finding + '/' + req.params.id;
			var args = {
				headers: { "Content-Type": "application/json" }
			};

			console.log( req );
			client.delete( url, args, function (data, response) {
				res.json( { data } );
			});
		}
	} );
}