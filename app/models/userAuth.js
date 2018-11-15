const mongoose = require( 'mongoose' );

const UserAuthSchema = mongoose.Schema( {
	USER_AUTH_CODE: String,
	EMPLOYEE_NIK: String,
	USER_ROLE: String,
	REF_ROLE: String,
	LOCATION_CODE: String
});

module.exports = mongoose.model( 'UserAuth', UserAuthSchema, 'TM_USER_AUTH' );