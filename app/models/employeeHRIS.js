const mongoose = require( 'mongoose' );

const EmployeeHRISSchema = mongoose.Schema( {
	EMPLOYEE_NIK: String,
	EMPLOYEE_USERNAME: String,
	EMPLOYEE_FULLNAME: String,
	EMPLOYEE_GENDER: String,
	EMPLOYEE_RELIGION: String,
	EMPLOYEE_BIRTHDAY: {
		type: Date,
		default: function() {
			return null;
		}
	},
	EMPLOYEE_BANKCODE: String,
	EMPLOYEE_BANKNAME: String,
	EMPLOYEE_BANKACCOUNT: String,
	EMPLOYEE_ACCBANKNAME: String,
	EMPLOYEE_POSITIONCODE: String,
	EMPLOYEE_POSITION: String,
	EMPLOYEE_GRADECODE: String,
	EMPLOYEE_GRADE: String,
	EMPLOYEE_LEVEL: String,
	EMPLOYEE_DEPTCODE: String,
	EMPLOYEE_DEPARTMENT: String,
	EMPLOYEE_DIVCODE: String,
	EMPLOYEE_DIVISION: String,
	EMPLOYEE_COMPANYCODE: String,
	EMPLOYEE_LOCATIONCODE: String,
	LOCATION: String,
	EMPLOYEE_EMAIL: String,
	EMPLOYEE_SPVNIK: String,
	EMPLOYEE_SPV: String,
	EMPLOYEE_JOINDATE: {
		type: Date,
		default: function() {
			return null;
		}
	},
	EMPLOYEE_RESIGNDATE: {
		type: Date,
		default: function() {
			return null;
		}
	},
	INSERT_TIME_DW: {
		type: Date,
		default: function() {
			return null;
		}
	},
	UPDATE_TIME_DW: {
		type: Date,
		default: function() {
			return null;
		}
	},
	DELETE_TIME_DW: {
		type: Date,
		default: function() {
			return null;
		}
	},
	EMPLOYEE_POSITIONCODE_HCIS: String,
	EMPLOYEE_DEPTCODE_HCIS: String,
	EMPLOYEE_DIVCODE_HCIS: String,
	EMPLOYEE_LOCATIONCODE_HCIS: String,
	FLAG_UPDATE: {
		type: String,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'EmployeeHRIS', EmployeeHRISSchema, 'TM_EMPLOYEE_HRIS' );