const mongoose = require( 'mongoose' );

const LoginSchema = mongoose.Schema( {
	USER_AUTH_CODE: String,
	EMPLOYEE_NIK: String,
	USERNAME: String,
	ACCESS_TOKEN: String,
	LAST_LOGIN: String,
	LOG_LOGIN: String,
	IMEI: String,
	INSERT_USER: String,
	INSERT_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	},
	UPDATE_USER: String,
	UPDATE_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	},
	DELETE_USER: String,
	DELETE_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'Login', LoginSchema, 'TM_LOGIN' );