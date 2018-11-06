const Client = require('node-rest-client').Client; 				// Import REST Client
const config = require( '../../config/config.js' );
let jwt = require( 'jsonwebtoken' );

exports.find = async ( req, res ) => {
	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
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
	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
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

/*
app.post( '/test', async ( req, res ) => {
	var data = {
		national:"NATIONAL",
		region_code:"02",
		comp_code:"21",
		est_code:"31",
		werks:"2131",
		sub_ba_code:"",
		kebun_code:"",
		afd_code:"C",
		afd_name:"Ferdinand",
		block_code:"070",
		block_name:"E30",
		block_code_gis:"2131070"
	};

	var client = new Client();

	var url = 'http://tap-api-masterdata.openode.io/api/block';
	var args = {
		data: data,
		headers: { "Content-Type": "application/json" }
	};
	
	client.post( url, args, function ( data, response ) {
		res.json({data});
	});

});
*/


/*
exports.test = ( req, res ) => {
	const bearerHeader = req.headers['authorization'];
	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {
			res.json( {
				message: 'Post OK....',
				authData
			} );
		}
	} );
	//res.json({message:'OK'});
	//console.log(req.token);
};
*/