const loginModel = require( '../models/login.js' );
const loginLogModel = require( '../models/loginLog.js' );

module.exports.setLogin = function ( request ) {
	const set = new loginModel( {
		USER_AUTH_CODE: request.USER_AUTH_CODE || "",
		EMPLOYEE_NIK: request.EMPLOYEE_NIK || "",
		USERNAME: request.USERNAME || "",
		ACCESS_TOKEN: request.ACCESS_TOKEN || "",
		LAST_LOGIN: new Date(),
		LOG_LOGIN: request.LOG_LOGIN || "",
		IMEI: request.IMEI || "",
		INSERT_USER: request.INSERT_USER || "",
		INSERT_TIME: request.INSERT_TIME || "",
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
				const loginLog = new loginLogModel({
					USER_AUTH_CODE: request.USER_AUTH_CODE || "",
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
				INSERT_USER: request.INSERT_USER || "",
				INSERT_TIME: request.INSERT_TIME || "",
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