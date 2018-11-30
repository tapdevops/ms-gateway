const mongoose = require( 'mongoose' );

const EmployeeSAPSchema = mongoose.Schema( {

	WERKS: String,
	PROF_NAME: String,
	COMP_CODE: String,
	EST_CODE: String,
	AFD_CODE: String,
	DEPARTEMEN: String,
	NIK: String,
	EMPLOYEE_NIK: String,
	EMPLOYEE_NAME: String,
	START_VALID: {
		type: Date,
		default: function() {
			return null;
		}
	},
	END_VALID: {
		type: Date,
		default: function() {
			return null;
		}
	},
	ENTRY_DATE: {
		type: Date,
		default: function() {
			return null;
		}
	},
	RES_DATE: {
		type: Date,
		default: function() {
			return null;
		}
	},
	JOB_CODE: String,
	JOB_TYPE: String,
	EMP_STAT: String,
	EMP_STAT1: String,
	ADDRESS: String,
	POB: String,
	SEX: String,
	RELIGION: String,
	STATUS: String,


	GANGCODE: String, 
	SPV_NIK: String, 
	INSERT_TIME_DW: String, 
	UPDATE_TIME_DW: String, 
	NO_KTP: String, 
	NPWP: String, 
	FINGER_CODE: String, 


	GOLONGAN: String, 
	EMAIL: String, 
	PHONE: String, 
	TIME_ID: String, 
	PHASE: String, 
	CONDUCTOR_NAME: String, 
	CUSTOMER: String, 
	RESIDENT_FLAG: String, 
	IDENTIFICATION: String, 
	HOME_PHONE: String, 
	MOBILE_PHONE: String, 

	SALARY_TYPE: String, 
	POSITION: String, 
	LEVEL_EMPLOYEE: String, 
	CURRENCY: String, 
	SALARY: String, 
	INSENTIF: String, 
	RICE_PORTION_OPTIONS: String, 
	ORGANIZATION_CODE: String, 
	ASTEK_TYPE: String, 
	IC_NUMBER_OLD: String, 
	IC_NUMBER_NEW: String, 
	EPF_NUMBER: String, 
	SOSCO_NUMBER: String, 
	RACE: String, 
	PAYMENT_TYPE: String, 
	IC_SARAWAK_REGION: String, 
	PASSPORT_NUMBER: String, 
	PASSPORT_EXPIRE_DATE: {
		type: Date,
		default: function() {
			return null;
		}
	}, 
	WORK_PERMIT_EXPIRE_DATE: {
		type: Date,
		default: function() {
			return null;
		}
	}, 


	DOB: {
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

module.exports = mongoose.model( 'EmployeeSAP', EmployeeSAPSchema, 'TM_EMPLOYEE_SAP' );