const mongoose = require( 'mongoose' );

const PJSSchema = mongoose.Schema( {
	EMPLOYEE_NIK: String,
	USERNAME: String,
	NAMA_LENGKAP: String,
	JOB_CODE: String,
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
	},
	FLAG_UPDATE: {
		type: String,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'PJS', PJSSchema, 'TM_PJS' );