const config = require( '../../config/config.js' ); 				// Config
const uuid = require( 'uuid' );
const nJwt = require( 'njwt' );

module.exports.generateToken = function( claims ) {
	// Compile JWT
	var njwt = nJwt.create( claims, config.secret_key, config.token_algorithm );

	// Set Expiration Time
	njwt.setExpiration( new Date().getTime() + ( config.token_expiration * 24 * 60 * 60 * 1000 ) );

	// Compile Token
	var token = njwt.compact();

	// Return new token
	//return nJwt.verify( token, config.secret_key, 'HS256');
	return token;
}