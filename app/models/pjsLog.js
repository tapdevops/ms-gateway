const mongoose = require( 'mongoose' );

const PJSLogSchema = mongoose.Schema( {
	EMPLOYEE_NIK: String,
	PROSES: String,
	INSERT_USER: String,
	INSERT_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'PJSLog', PJSLogSchema, 'T_LOG_PJS' );