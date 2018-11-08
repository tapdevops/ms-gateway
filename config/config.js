module.exports = {
	//
	app_port: process.env.PORT || 3001,
	app_name: 'Microservices Gateway',
	secret_key: 'T4pagri123#',
	url: {
		microservices: {
			inspection: 			'http://localhost:3002/inspection',
			masterdata_block: 		'http://localhost:3003/block',
			masterdata_afdeling: 	'http://localhost:3003/afdeling',
			ldap: 					'http://tap-ldapdev.tap-agri.com/login'
		}
	}
}