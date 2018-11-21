const mongoose = require( 'mongoose' );

const LoginLogSchema = mongoose.Schema( {
	USER_AUTH_CODE: String,
	ACCESS_TOKEN: String,
	EMPLOYEE_NIK: String,
	USERNAME: String,
	IMEI: String,
	DATE_LOGIN: {
		type: Date,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'LoginLog', LoginLogSchema, 'T_LOG_LOGIN' );