var login = require( '../libraries/login' );
exports.test = ( req, res ) => {
	console.log(login.checkHRIS( 'ferdinand' ));
	res.json({
		message: 'WAW',
		data: login.checkHRIS( 'ferdinand' )
	})
}