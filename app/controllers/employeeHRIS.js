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
				EMPLOYEE_NIK: req.body.EMPLOYEE_NIK || "",
				USERNAME: req.body.USERNAME || "",
				NAMA_LENGKAP: req.body.NAMA_LENGKAP || "",
				JOB_CODE: req.body.JOB_CODE || "",
				INSERT_USER: req.body.INSERT_USER || "",
				INSERT_TIME: ( req.body.INSERT_TIME != '' ) ? Date( req.body.INSERT_TIME ) : "",
				UPDATE_USER: req.body.UPDATE_USER || "",
				UPDATE_TIME: ( req.body.UPDATE_TIME != '' ) ? Date( req.body.UPDATE_TIME ) : "",
				DELETE_USER: req.body.DELETE_USER || "",
				DELETE_USER: ( req.body.DELETE_USER != '' ) ? Date( req.body.DELETE_USER ) : "",
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
			if ( data.NAMA_LENGKAP != req.body.NAMA_LENGKAP ) {
				
				employeeHRISModel.findOneAndUpdate( { 
					EMPLOYEE_NIK: req.body.EMPLOYEE_NIK
				}, {
					NAMA_LENGKAP: req.body.NAMA_LENGKAP || "",
					JOB_CODE: req.body.JOB_CODE || "",
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