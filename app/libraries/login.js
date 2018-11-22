const loginModel = require( '../models/login.js' );
const loginLogModel = require( '../models/loginLog.js' );

module.exports.setLogLogin = function( request ) {
	loginLogModel.find( { USER_AUTH_CODE : request.USER_AUTH_CODE } ).count()
	.then( data => {
		if ( !data ) {
			console.log( 'Set Log Login Count Error 2' );
		}
		else {
			loginModel.findOneAndUpdate( { 
				USER_AUTH_CODE: request.USER_AUTH_CODE
			}, {
				LOG_LOGIN: data
			}, { new: true } )
			.then( data => {
				if ( !data ) {
					console.log( 'Set Login Update Error 5' );
				}
				console.log( 'Success' );
			}).catch( err => {
				if( err.kind === 'ObjectId' ) {
					console.log( 'Set Login Update Error 3' );
				}
				console.log( 'Set Log Login Count Error 2' );
			});
		}
	} ).catch( err => {
		console.log( 'Set Log Login Count Error' );
	} );
}

module.exports.setLogin = function ( request ) {
	console.log( 'SET LOG LOGINCC' );
	const set = new loginModel( {
		USER_AUTH_CODE: request.USER_AUTH_CODE || "",
		EMPLOYEE_NIK: request.EMPLOYEE_NIK || "",
		USERNAME: request.USERNAME || "",
		ACCESS_TOKEN: request.ACCESS_TOKEN || "",
		LAST_LOGIN: new Date(),
		LOG_LOGIN: 1,
		IMEI: request.IMEI || "",
		INSERT_USER: request.USERNAME || "",
		INSERT_TIME: new Date(),
		UPDATE_USER: request.USERNAME || "",
		UPDATE_TIME: new Date(),
		DELETE_USER: request.DELETE_USER || "",
		DELETE_TIME: request.DELETE_TIME || ""
	} );

	loginModel.findOne( { 
		EMPLOYEE_NIK: request.EMPLOYEE_NIK,
		USERNAME: request.USERNAME
	} ).then( data => {

		// Create Data Baru
		if ( !data ) {
			set.save()
			.then( data => {
				if ( !data ) {
					console.log( 'Set Login Error 2' );
				}

				console.log( 'TOKEN :::: ' + request.ACCESS_TOKEN );
				const loginLog = new loginLogModel({
					USER_AUTH_CODE: request.USER_AUTH_CODE || "",
					ACCESS_TOKEN: data.ACCESS_TOKEN || "",
					EMPLOYEE_NIK: request.EMPLOYEE_NIK || "",
					USERNAME: request.USERNAME || "",
					IMEI: request.IMEI || "",
					DATE_LOGIN: new Date()
				});

				loginLog.save()
				.then( data => {
					if ( !data ) {
						console.log( 'Set Login Log Error 2' );
					}
					console.log( 'Success' );
				} ).catch( err => {
					console.log( 'Set Login Log Error 2' );
				} );
			} ).catch( err => {
				console.log( 'Set Login Error 1' );
			} );
		}

		// Update data TM_LOGIN yang sudah ada
		else {


			loginModel.findOneAndUpdate( { 
				EMPLOYEE_NIK: request.EMPLOYEE_NIK,
				USERNAME: request.USERNAME
			}, {
				USERNAME: request.USERNAME || "",
				ACCESS_TOKEN: request.ACCESS_TOKEN || "",
				LAST_LOGIN: new Date(),
				LOG_LOGIN: request.LOG_LOGIN || "",
				IMEI: request.IMEI || "",
				UPDATE_USER: request.USERNAME || "",
				UPDATE_TIME: new Date(),
				DELETE_USER: request.DELETE_USER || "",
				DELETE_TIME: request.DELETE_TIME || ""
			}, { new: true } )
			.then( data => {
				if( !data ) {
					console.log( 'Set Login Update Error 3' );
				}
				else {
					const loginLog = new loginLogModel({
						USER_AUTH_CODE: request.USER_AUTH_CODE || "",
						ACCESS_TOKEN: data.ACCESS_TOKEN || "",
						EMPLOYEE_NIK: request.EMPLOYEE_NIK || "",
						USERNAME: request.USERNAME || "",
						IMEI: request.IMEI || "",
						DATE_LOGIN: new Date()
					});

					loginLog.save()
					.then( data => {
						if ( !data ) {
							console.log( 'Set Login Log Error 2' );
						}
						
						loginLogModel.find( { USER_AUTH_CODE : request.USER_AUTH_CODE } ).count()
						.then( data => {
							if ( !data ) {
								console.log( 'Set Log Login Count Error 2' );
							}
							else {
								loginModel.findOneAndUpdate( { 
									USER_AUTH_CODE: request.USER_AUTH_CODE
								}, {
									LOG_LOGIN: data
								}, { new: true } )
								.then( data => {
									if ( !data ) {
										console.log( 'Set Login Update Error 5' );
									}
									console.log( 'Success' );
								}).catch( err => {
									if( err.kind === 'ObjectId' ) {
										console.log( 'Set Login Update Error 3' );
									}
									console.log( 'Set Log Login Count Error 2' );
								});
							}
						} ).catch( err => {
							console.log( 'Set Log Login Count Error' );
						} );
						
					} ).catch( err => {
						console.log( 'Set Login Log Error 2' );
					} );
					console.log( 'Set Login Update Success' );
				}
			}).catch( err => {
				if( err.kind === 'ObjectId' ) {
					console.log( 'Set Login Update Error 2' );
				}
				console.log( 'Set Login Update Error 1' );
			});
		}

	} ).catch( err => {
		if( err.kind === 'ObjectId' ) {
			console.log( 'Error retrieving Data 2' );
		}
		console.log( 'Error retrieving Data 1' );
	} );

	

};