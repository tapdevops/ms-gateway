const employeeSAPModel = require( '../models/employeeSAP.js' );
const dateFormat = require( 'dateformat' );
var querystring = require('querystring');
var url = require( 'url' );
const date = require( '../libraries/date.js' );
const dateAndTimes = require( 'date-and-time' );

// Create or update data
exports.createOrUpdate = ( req, res ) => {
	
	if( !req.body.EMPLOYEE_NIK ) {
		return res.send({
			status: false,
			message: 'Invalid input',
			data: {}
		});
	}
	//new Date().getTime()
	employeeSAPModel.findOne( { 
		EMPLOYEE_NIK: req.body.EMPLOYEE_NIK
	} ).then( data => {

		// Kondisi belum ada data, create baru dan insert ke Sync List
		if( !data ) {

			const set = new employeeSAPModel( {
				WERKS: req.body.WERKS || "",
				PROF_NAME: req.body.PROF_NAME || "",
				COMP_CODE: req.body.COMP_CODE || "",
				EST_CODE: req.body.EST_CODE || "",
				AFD_CODE: req.body.AFD_CODE || "",
				DEPARTEMEN: req.body.DEPARTEMEN || "",
				NIK: req.body.NIK || "",
				EMPLOYEE_NIK: req.body.EMPLOYEE_NIK || "",
				EMPLOYEE_NAME: req.body.EMPLOYEE_NAME || "",
				START_VALID: req.body.START_VALID || "",
				END_VALID: req.body.END_VALID || "",
				ENTRY_DATE: req.body.ENTRY_DATE || "",
				RES_DATE: req.body.RES_DATE || "",
				JOB_CODE: req.body.JOB_CODE || "",
				JOB_TYPE: req.body.JOB_TYPE || "",
				EMP_STAT: req.body.EMP_STAT || "",
				EMP_STAT1: req.body.EMP_STAT1 || "",
				ADDRESS: req.body.ADDRESS || "",
				POB: req.body.POB || "",
				DOB: req.body.DOB || "",
				SEX: req.body.SEX || "",
				RELIGION: req.body.RELIGION || "",
				STATUS: req.body.STATUS || "",

				GANGCODE: req.body.GANGCODE || "", 
				SPV_NIK: req.body.SPV_NIK || "", 
				INSERT_TIME_DW: req.body.INSERT_TIME_DW || "", 
				UPDATE_TIME_DW: req.body.UPDATE_TIME_DW || "", 
				NO_KTP: req.body.NO_KTP || "", 
				NPWP: req.body.NPWP || "", 
				FINGER_CODE: req.body.FINGER_CODE || "", 

				GOLONGAN: req.body.GOLONGAN || "", 
				EMAIL: req.body.EMAIL || "", 
				PHONE: req.body.PHONE || "", 
				TIME_ID: req.body.TIME_ID || "", 
				PHASE: req.body.PHASE || "", 
				CONDUCTOR_NAME: req.body.CONDUCTOR_NAME || "", 
				CUSTOMER: req.body.CUSTOMER || "", 
				RESIDENT_FLAG: req.body.RESIDENT_FLAG || "", 
				IDENTIFICATION: req.body.IDENTIFICATION || "", 
				HOME_PHONE: req.body.HOME_PHONE || "", 
				MOBILE_PHONE: req.body.MOBILE_PHONE || "", 

				SALARY_TYPE: req.body.SALARY_TYPE || "", 
				POSITION: req.body.POSITION || "", 
				LEVEL_EMPLOYEE: req.body.LEVEL_EMPLOYEE || "", 
				CURRENCY: req.body.CURRENCY || "", 
				SALARY: req.body.SALARY || "", 
				INSENTIF: req.body.INSENTIF || "", 
				RICE_PORTION_OPTIONS: req.body.RICE_PORTION_OPTIONS || "", 
				ORGANIZATION_CODE: req.body.ORGANIZATION_CODE || "", 
				ASTEK_TYPE: req.body.ASTEK_TYPE || "", 
				IC_NUMBER_OLD: req.body.IC_NUMBER_OLD || "", 
				IC_NUMBER_NEW: req.body.IC_NUMBER_NEW || "", 
				EPF_NUMBER: req.body.EPF_NUMBER || "", 
				SOSCO_NUMBER: req.body.SOSCO_NUMBER || "", 
				RACE: req.body.RACE || "", 
				PAYMENT_TYPE: req.body.PAYMENT_TYPE || "", 
				IC_SARAWAK_REGION: req.body.IC_SARAWAK_REGION || "", 
				PASSPORT_NUMBER: req.body.PASSPORT_NUMBER || "", 
				PASSPORT_EXPIRE_DATE: req.body.PASSPORT_EXPIRE_DATE || "", 
				WORK_PERMIT_EXPIRE_DATE: req.body.WORK_PERMIT_EXPIRE_DATE || "", 

				BOND_EXPIRE_DATE: req.body.BOND_EXPIRE_DATE || "",
				EPF_TYPE: req.body.EPF_TYPE || "",
				EPF_PERCENTAGE: req.body.EPF_PERCENTAGE || "",
				BANK_ACCOUNT_NUMBER: req.body.BANK_ACCOUNT_NUMBER || "",
				DESCRIPTION: req.body.DESCRIPTION || "",
				EMPLOYEE_STATUS_INDICATOR: req.body.EMPLOYEE_STATUS_INDICATOR || "",
				NIK_OLD: req.body.NIK_OLD || "",
				EXPIRE_DATE_CONTRACT: req.body.EXPIRE_DATE_CONTRACT || "",
				INDCTR: req.body.INDCTR || "",
				PERIOD_PROBATION: req.body.PERIOD_PROBATION || "",
				CONTRACT_NO: req.body.CONTRACT_NO || "",
				SPK_SK: req.body.SPK_SK || "",
				NO_KK: req.body.NO_KK || "",
				BPJS_KETENAGAKERJAAN: req.body.BPJS_KETENAGAKERJAAN || "",
				BPJS_KESEHATAN: req.body.BPJS_KESEHATAN || "",
				DOMISILI_ID: req.body.DOMISILI_ID || "",
				LICENSE_ID: req.body.LICENSE_ID || "",

				FLAG_UPDATE: dateAndTimes.format( new Date(), 'YYYYMMDD' )
			} );
			
			set.save()
			.then( data => {
				res.send({
					status: true,
					message: 'Success 2',
					data: {}
				});
			} ).catch( err => {
				res.send( {
					status: false,
					message: 'Some error occurred while creating data',
					data: {}
				} );
			} );
		}
		// Kondisi data sudah ada, check value, jika sama tidak diupdate, jika beda diupdate dan dimasukkan ke Sync List
		else {
			if ( data.EMPLOYEE_NIK ) {
				
				employeeSAPModel.findOneAndUpdate( { 
					EMPLOYEE_NIK: req.body.EMPLOYEE_NIK
				}, {
					WERKS: req.body.WERKS || "",
					PROF_NAME: req.body.PROF_NAME || "",
					COMP_CODE: req.body.COMP_CODE || "",
					EST_CODE: req.body.EST_CODE || "",
					AFD_CODE: req.body.AFD_CODE || "",
					DEPARTEMEN: req.body.DEPARTEMEN || "",
					EMPLOYEE_NAME: req.body.EMPLOYEE_NAME || "",
					START_VALID: req.body.START_VALID || "",
					END_VALID: req.body.END_VALID || "",
					ENTRY_DATE: req.body.ENTRY_DATE || "",
					RES_DATE: req.body.RES_DATE || "",
					JOB_CODE: req.body.JOB_CODE || "",
					JOB_TYPE: req.body.JOB_TYPE || "",
					EMP_STAT: req.body.EMP_STAT || "",
					EMP_STAT1: req.body.EMP_STAT1 || "",
					ADDRESS: req.body.ADDRESS || "",
					POB: req.body.POB || "",
					DOB: req.body.DOB || "",
					SEX: req.body.SEX || "",
					RELIGION: req.body.RELIGION || "",
					STATUS: req.body.STATUS || "",

					GANGCODE: req.body.GANGCODE || "", 
					SPV_NIK: req.body.SPV_NIK || "", 
					INSERT_TIME_DW: req.body.INSERT_TIME_DW || "", 
					UPDATE_TIME_DW: req.body.UPDATE_TIME_DW || "", 
					NO_KTP: req.body.NO_KTP || "", 
					NPWP: req.body.NPWP || "", 
					FINGER_CODE: req.body.FINGER_CODE || "", 

					GOLONGAN: req.body.GOLONGAN || "", 
					EMAIL: req.body.EMAIL || "", 
					PHONE: req.body.PHONE || "", 
					TIME_ID: req.body.TIME_ID || "", 
					PHASE: req.body.PHASE || "", 
					CONDUCTOR_NAME: req.body.CONDUCTOR_NAME || "", 
					CUSTOMER: req.body.CUSTOMER || "", 
					RESIDENT_FLAG: req.body.RESIDENT_FLAG || "", 
					IDENTIFICATION: req.body.IDENTIFICATION || "", 
					HOME_PHONE: req.body.HOME_PHONE || "", 
					MOBILE_PHONE: req.body.MOBILE_PHONE || "", 

					SALARY_TYPE: req.body.SALARY_TYPE || "", 
					POSITION: req.body.POSITION || "", 
					LEVEL_EMPLOYEE: req.body.LEVEL_EMPLOYEE || "", 
					CURRENCY: req.body.CURRENCY || "", 
					SALARY: req.body.SALARY || "", 
					INSENTIF: req.body.INSENTIF || "", 
					RICE_PORTION_OPTIONS: req.body.RICE_PORTION_OPTIONS || "", 
					ORGANIZATION_CODE: req.body.ORGANIZATION_CODE || "", 
					ASTEK_TYPE: req.body.ASTEK_TYPE || "", 
					IC_NUMBER_OLD: req.body.IC_NUMBER_OLD || "", 
					IC_NUMBER_NEW: req.body.IC_NUMBER_NEW || "", 
					EPF_NUMBER: req.body.EPF_NUMBER || "", 
					SOSCO_NUMBER: req.body.SOSCO_NUMBER || "", 
					RACE: req.body.RACE || "", 
					PAYMENT_TYPE: req.body.PAYMENT_TYPE || "", 
					IC_SARAWAK_REGION: req.body.IC_SARAWAK_REGION || "", 
					PASSPORT_NUMBER: req.body.PASSPORT_NUMBER || "", 
					PASSPORT_EXPIRE_DATE: req.body.PASSPORT_EXPIRE_DATE || "", 
					WORK_PERMIT_EXPIRE_DATE: req.body.WORK_PERMIT_EXPIRE_DATE || "", 

					BOND_EXPIRE_DATE: req.body.BOND_EXPIRE_DATE || "",
					EPF_TYPE: req.body.EPF_TYPE || "",
					EPF_PERCENTAGE: req.body.EPF_PERCENTAGE || "",
					BANK_ACCOUNT_NUMBER: req.body.BANK_ACCOUNT_NUMBER || "",
					DESCRIPTION: req.body.DESCRIPTION || "",
					EMPLOYEE_STATUS_INDICATOR: req.body.EMPLOYEE_STATUS_INDICATOR || "",
					NIK_OLD: req.body.NIK_OLD || "",
					EXPIRE_DATE_CONTRACT: req.body.EXPIRE_DATE_CONTRACT || "",
					INDCTR: req.body.INDCTR || "",
					PERIOD_PROBATION: req.body.PERIOD_PROBATION || "",
					CONTRACT_NO: req.body.CONTRACT_NO || "",
					SPK_SK: req.body.SPK_SK || "",
					NO_KK: req.body.NO_KK || "",
					BPJS_KETENAGAKERJAAN: req.body.BPJS_KETENAGAKERJAAN || "",
					BPJS_KESEHATAN: req.body.BPJS_KESEHATAN || "",
					DOMISILI_ID: req.body.DOMISILI_ID || "",
					LICENSE_ID: req.body.LICENSE_ID || "",

					FLAG_UPDATE: dateAndTimes.format( new Date(), 'YYYYMMDD' )
				}, { new: true } )
				.then( data => {
					if( !data ) {
						return res.send( {
							status: false,
							message: "Data error updating 2",
							data: {}
						} );
					}
					else {
						res.send({
							status: true,
							message: 'Success',
							data: {}
						});
					}
				}).catch( err => {
					if( err.kind === 'ObjectId' ) {
						return res.send( {
							status: false,
							message: "Data not found 2",
							data: {}
						} );
					}
					return res.send( {
						status: false,
						message: "Data error updating",
						data: {}
					} );
				});
				
				
			}
			else {
				res.send( {
					status: true,
					message: 'Skip Update',
					data: {}
				} );
			}
		}
		
	} ).catch( err => {
		if( err.kind === 'ObjectId' ) {
			return res.send({
				status: false,
				message: "Data not found 1",
				data: {}
			});
		}

		return res.send({
			status: false,
			message: "Error retrieving Data",
			data: {}
		} );
	} );
};