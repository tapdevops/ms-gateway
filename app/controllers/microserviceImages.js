const Client = require( 'node-rest-client' ).Client;
const fs = require( 'file-system' );
const request = require( 'request' );
const config = require( '../../config/config.js' );
let jwt = require( 'jsonwebtoken' );

// IMAGE - CREATE
exports.create = async ( req, res ) => {
	
	jwt.verify( req.token, config.secret_key, ( err, authData ) => {
		if ( err ) {
			res.sendStatus( 403 );
		}
		else {

			var formData = {
			// Pass a simple key-value pair
			my_field: 'my_value',
			// Pass data via Buffers
			//files: Buffer.from( req.files.filename.data ),
			//files: Buffer.from( req.files.filename.data ),
			// Pass data via Streams
			//my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
			// Pass multiple values /w an Array
			//attachments: [
			//	fs.createReadStream(__dirname + '/attachment1.jpg'),
			//	fs.createReadStream(__dirname + '/attachment2.jpg')
			//],
			// Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
			// Use case: for some types of streams, you'll need to provide "file"-related information manually.
			// See the `form-data` README for more information about options: https://github.com/form-data/form-data
			filename: {
				value:  Buffer.from( req.files.filename.data ),
				options: {
					filename: req.files.filename.name,
					contentType: req.files.filename.name,
					encoding: req.files.filename.encoding,
					mimetype: req.files.filename.mimetype
				}
			}
		};
request.post({url: config.url.microservices.images, formData: formData}, function optionalCallback(err, httpResponse, body) {
	if ( err ) {
		return console.error('upload failed:', err);
	}
	console.log('Upload successful!  Server responded with:', body);
});

			/*
			var client = new Client();
			var url = config.url.microservices.images;
			var args = {
				data: {
					IMAGE_CODE: req.body.IMAGE_CODE,
					TR_CODE: req.body.TR_CODE,
					STATUS_IMAGE: req.body.STATUS_IMAGE,
					STATUS_SYNC: req.body.STATUS_SYNC,
					SYNC_TIME: req.body.SYNC_TIME,
					INSERT_USER: req.body.INSERT_USER,
					FILES: req.files.filename
				},
				files: req.files,
				headers: { "Content-Type": "multipart/form-data" }
			};

			console.log(args)

			client.post( url, args, function ( data, response ) {
				res.json( { data } );
			});
			*/
		}
	} );
	
}