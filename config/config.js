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
			inspection: 			'http://localhost:3002/inspection',
			inspection_header: 		'http://localhost:3002/inspection-header',
			inspection_detail: 		'http://localhost:3002/inspection-detail',
			inspection_tracking: 	'http://localhost:3002/inspection-tracking',
			masterdata_block: 		'http://localhost:3003/block',
			masterdata_afdeling:	'http://localhost:3003/afdeling',
			images: 				'http://localhost:3004/image',
			finding:				'http://localhost:3005/finding',
			finding_history:		'http://localhost:3005/finding-history',
			ldap: 					'http://tap-ldapdev.tap-agri.com/login'
		}
	}

}