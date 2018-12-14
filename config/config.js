module.exports = {

	/*
	|--------------------------------------------------------------------------
	| App Config
	|--------------------------------------------------------------------------
	*/
	app_port: process.env.PORT || 3008,
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
			inspection: 			'http://149.129.244.86:3008/inspection',
			inspection_header: 		'http://149.129.244.86:3008/inspection-header',
			inspection_detail: 		'http://149.129.244.86:3008/inspection-detail',
			inspection_tracking: 	'http://149.129.244.86:3002/inspection-tracking',
			masterdata_block: 		'http://149.129.244.86:3003/block',
			masterdata_afdeling:	'http://149.129.244.86:3003/afdeling',
			images: 				'http://149.129.244.86:3004/image',
			finding:				'http://149.129.244.86:3005/finding',
			finding_history:		'http://149.129.244.86:3005/finding-history',
			ldap: 					'http://tap-ldapdev.tap-agri.com/login'
		}
	}


}
