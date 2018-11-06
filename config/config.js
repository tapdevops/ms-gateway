module.exports = {
	app_port: process.env.PORT || 3001,
	app_name: 'Microservices Gateway',
	secret_key: 'T4pagri123#',
	url: {
		microservices: {
			inspection: 'http://localhost:3002/api/inspection',
			masterdata: {
				block: ''
			}
		}
	}
}