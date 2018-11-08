module.exports = {
	//
	app_port: process.env.PORT || 3001,
	app_name: 'Microservices Gateway',
	secret_key: 'T4pagri123#',
	url: {
		microservices: {
			inspection: 			'http://149.129.242.205:3002/api/inspection',
			masterdata_block: 		'http://149.129.242.205:3002/block',
			masterdata_afdeling: 		'http://149.129.242.205:3002/afdeling',
			ldap: 				'http://tap-ldapdev.tap-agri.com/login'
		}
	}
}
