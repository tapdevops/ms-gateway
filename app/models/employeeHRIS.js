const mongoose = require( 'mongoose' );

const EmployeeHRISSchema = mongoose.Schema( {
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
	}
});

module.exports = mongoose.model( 'EmployeeHRIS', EmployeeHRISSchema, 'TM_EMPLOYEE_HRIS' );