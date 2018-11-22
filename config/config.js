module.exports = {

	/*
	|--------------------------------------------------------------------------
	| App Config
	|--------------------------------------------------------------------------
	*/
	app_port: process.env.PORT || 3001,
	app_name: 'Microservice Auth',

	/*
	|--------------------------------------------------------------------------
	| Token
	|--------------------------------------------------------------------------
	*/
	secret_key: 'T4pagri123#',
	token_expiration: 7, // Days
	token_algorithm: 'HS256',

	/*
	|--------------------------------------------------------------------------
	| Microservice URL
	|--------------------------------------------------------------------------
	*/
	url: {
		microservices: {
			inspection: 			'http://149.129.242.205:3002/api/inspection',
			masterdata_block: 		'http://149.129.242.205:3003/block',
			masterdata_afdeling:	'http://149.129.242.205:3003/afdeling',
			images: 				'http://149.129.242.205:3004/upload/image',
			finding:				'http://localhost:3005/finding',
			ldap: 					'http://tap-ldapdev.tap-agri.com/login'
		}
	}

}