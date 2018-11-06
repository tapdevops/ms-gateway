const mongoose = require( 'mongoose' );

const LoginSchema = mongoose.Schema( {
	USER_AUTH_CODE: String,
	EMPLOYEE_NIK: String,
	USERNAME: String,
	ACCESS_TOKEN: String,
	LAST_LOGIN: String,
	LOG_LOGIN: String,
	INSERT_USER: String,
	INSERT_TIME: String,
	UPDATE_USER: String,
	UPDATE_TIME: String,
	DELETE_USER: String,
	DELETE_TIME: String
});

module.exports = mongoose.model( 'Login', LoginSchema, 'TM_LOGIN' );