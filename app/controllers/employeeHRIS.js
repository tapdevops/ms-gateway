const employeeHRISModel = require( '../models/employeeHRIS.js' );
const dateFormat = require( 'dateformat' );
var querystring = require('querystring');
var url = require( 'url' );
const date = require( '../libraries/date.js' );
const dateAndTimes = require( 'date-and-time' );

// Create or update data
exports.createOrUpdate = ( req, res ) => {
	
	if( !req.body.EMPLOYEE_NIK ) {
		return res.status( 400 ).send({
			status: false,
			message: 'Invalid input',
			data: {}
		});
	}

	employeeHRISModel.findOne( { 
		EMPLOYEE_NIK: req.body.EMPLOYEE_NIK
	} ).then( data => {

		// Kondisi belum ada data, create baru dan insert ke Sync List
		if( !data ) {

			const empHRIS = new employeeHRISModel( {
				EMPLOYEE_NIK: req.body.EMPLOYEE_NIK,
				EMPLOYEE_USERNAME: req.body.EMPLOYEE_USERNAME,
				EMPLOYEE_FULLNAME: req.body.EMPLOYEE_FULLNAME,
				EMPLOYEE_GENDER: req.body.EMPLOYEE_GENDER,
				EMPLOYEE_RELIGION: req.body.EMPLOYEE_RELIGION,
				EMPLOYEE_BIRTHDAY: req.body.EMPLOYEE_BIRTHDAY,
				EMPLOYEE_BANKCODE: req.body.EMPLOYEE_BANKCODE,
				EMPLOYEE_BANKNAME: req.body.EMPLOYEE_BANKNAME,
				EMPLOYEE_BANKACCOUNT: req.body.EMPLOYEE_BANKACCOUNT,
				EMPLOYEE_ACCBANKNAME: req.body.EMPLOYEE_ACCBANKNAME,
				EMPLOYEE_POSITIONCODE: req.body.EMPLOYEE_POSITIONCODE,
				EMPLOYEE_POSITION: req.body.EMPLOYEE_POSITION,
				EMPLOYEE_GRADECODE: req.body.EMPLOYEE_GRADECODE,
				EMPLOYEE_GRADE: req.body.EMPLOYEE_GRADE,
				EMPLOYEE_LEVEL: req.body.EMPLOYEE_LEVEL,
				EMPLOYEE_DEPTCODE: req.body.EMPLOYEE_DEPTCODE,
				EMPLOYEE_DEPARTMENT: req.body.EMPLOYEE_DEPARTMENT,
				EMPLOYEE_DIVCODE: req.body.EMPLOYEE_DIVCODE,
				EMPLOYEE_DIVISION: req.body.EMPLOYEE_DIVISION,
				EMPLOYEE_COMPANYCODE: req.body.EMPLOYEE_COMPANYCODE,
				EMPLOYEE_LOCATIONCODE: req.body.EMPLOYEE_LOCATIONCODE,
				LOCATION: req.body.LOCATION,
				EMPLOYEE_EMAIL: req.body.EMPLOYEE_EMAIL,
				EMPLOYEE_SPVNIK: req.body.EMPLOYEE_SPVNIK,
				EMPLOYEE_SPV: req.body.EMPLOYEE_SPV,
				EMPLOYEE_JOINDATE: req.body.EMPLOYEE_JOINDATE,
				EMPLOYEE_RESIGNDATE: req.body.EMPLOYEE_RESIGNDATE,
				INSERT_TIME_DW: req.body.INSERT_TIME_DW,
				UPDATE_TIME_DW: req.body.UPDATE_TIME_DW,
				DELETE_TIME_DW: req.body.DELETE_TIME_DW,
				EMPLOYEE_POSITIONCODE_HCIS: req.body.EMPLOYEE_POSITIONCODE_HCIS,
				EMPLOYEE_DEPTCODE_HCIS: req.body.EMPLOYEE_DEPTCODE_HCIS,
				EMPLOYEE_DIVCODE_HCIS: req.body.EMPLOYEE_DIVCODE_HCIS,
				EMPLOYEE_LOCATIONCODE_HCIS: req.body.EMPLOYEE_LOCATIONCODE_HCIS,
				FLAG_UPDATE: dateAndTimes.format( new Date(), 'YYYYMMDD' )
			} );
			
			empHRIS.save()
			.then( data => {
				console.log(data);
				res.send({
					status: true,
					message: 'Success 2',
					data: {}
				});
			} ).catch( err => {
				res.status( 500 ).send( {
					status: false,
					message: 'Some error occurred while creating data',
					data: {}
				} );
			} );
		}
		// Kondisi data sudah ada, check value, jika sama tidak diupdate, jika beda diupdate dan dimasukkan ke Sync List
		else {
			if ( data.EMPLOYEE_FULLNAME != req.body.EMPLOYEE_FULLNAME ) {
				
				employeeHRISModel.findOneAndUpdate( { 
					EMPLOYEE_NIK: req.body.EMPLOYEE_NIK
				}, {
					EMPLOYEE_USERNAME: req.body.EMPLOYEE_USERNAME,
					EMPLOYEE_FULLNAME: req.body.EMPLOYEE_FULLNAME,
					EMPLOYEE_GENDER: req.body.EMPLOYEE_GENDER,
					EMPLOYEE_RELIGION: req.body.EMPLOYEE_RELIGION,
					EMPLOYEE_BIRTHDAY: req.body.EMPLOYEE_BIRTHDAY,
					EMPLOYEE_BANKCODE: req.body.EMPLOYEE_BANKCODE,
					EMPLOYEE_BANKNAME: req.body.EMPLOYEE_BANKNAME,
					EMPLOYEE_BANKACCOUNT: req.body.EMPLOYEE_BANKACCOUNT,
					EMPLOYEE_ACCBANKNAME: req.body.EMPLOYEE_ACCBANKNAME,
					EMPLOYEE_POSITIONCODE: req.body.EMPLOYEE_POSITIONCODE,
					EMPLOYEE_POSITION: req.body.EMPLOYEE_POSITION,
					EMPLOYEE_GRADECODE: req.body.EMPLOYEE_GRADECODE,
					EMPLOYEE_GRADE: req.body.EMPLOYEE_GRADE,
					EMPLOYEE_LEVEL: req.body.EMPLOYEE_LEVEL,
					EMPLOYEE_DEPTCODE: req.body.EMPLOYEE_DEPTCODE,
					EMPLOYEE_DEPARTMENT: req.body.EMPLOYEE_DEPARTMENT,
					EMPLOYEE_DIVCODE: req.body.EMPLOYEE_DIVCODE,
					EMPLOYEE_DIVISION: req.body.EMPLOYEE_DIVISION,
					EMPLOYEE_COMPANYCODE: req.body.EMPLOYEE_COMPANYCODE,
					EMPLOYEE_LOCATIONCODE: req.body.EMPLOYEE_LOCATIONCODE,
					LOCATION: req.body.LOCATION,
					EMPLOYEE_EMAIL: req.body.EMPLOYEE_EMAIL,
					EMPLOYEE_SPVNIK: req.body.EMPLOYEE_SPVNIK,
					EMPLOYEE_SPV: req.body.EMPLOYEE_SPV,
					EMPLOYEE_JOINDATE: req.body.EMPLOYEE_JOINDATE,
					EMPLOYEE_RESIGNDATE: req.body.EMPLOYEE_RESIGNDATE,
					INSERT_TIME_DW: req.body.INSERT_TIME_DW,
					UPDATE_TIME_DW: req.body.UPDATE_TIME_DW,
					DELETE_TIME_DW: req.body.DELETE_TIME_DW,
					EMPLOYEE_POSITIONCODE_HCIS: req.body.EMPLOYEE_POSITIONCODE_HCIS,
					EMPLOYEE_DEPTCODE_HCIS: req.body.EMPLOYEE_DEPTCODE_HCIS,
					EMPLOYEE_DIVCODE_HCIS: req.body.EMPLOYEE_DIVCODE_HCIS,
					EMPLOYEE_LOCATIONCODE_HCIS: req.body.EMPLOYEE_LOCATIONCODE_HCIS,
					FLAG_UPDATE: dateAndTimes.format( new Date(), 'YYYYMMDD' )
				}, { new: true } )
				.then( data => {
					if( !data ) {
						console.log('A');
						return res.status( 404 ).send( {
							status: false,
							message: "Data error updating 2",
							data: {}
						} );
					}
					else {
						console.log('B');
						res.send({
							status: true,
							message: 'Success',
							data: {}
						});
					}
				}).catch( err => {
					if( err.kind === 'ObjectId' ) {
						console.log('C');
						return res.status( 404 ).send( {
							status: false,
							message: "Data not found 2",
							data: {}
						} );
					}
					return res.status( 500 ).send( {
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
			return res.status( 404 ).send({
				status: false,
				message: "Data not found 1",
				data: {}
			});
		}

		return res.status( 500 ).send({
			status: false,
			message: "Error retrieving Data",
			data: {}
		} );
	} );
};