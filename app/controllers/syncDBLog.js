const syncDBLogModel = require( '../models/syncDBLog.js' );
const dateFormat = require( 'dateformat' );
var querystring = require('querystring');
var url = require( 'url' );
const date = require( '../libraries/date.js' );
const dateAndTimes = require( 'date-and-time' );
let jwt = require( 'jsonwebtoken' );
const config = require( '../../config/config.js' );

// Create and Save new Data
exports.create = ( req, res ) => {

	if( !req.body.FLAG_UPDATE ) {
		return res.status( 400 ).send({
			status: false,
			message: 'Invalid input',
			data: {}
		});
	}

	const setdata = new syncDBLogModel({
		FLAG_UPDATE: req.body.FLAG_UPDATE || "",
		NUMROWS: req.body.NUMROWS || "",
		START_TIME: req.body.START_TIME || "",
		END_TIME: req.body.END_TIME || "",
	});

	setdata.save()
	.then( data => {
		res.send({
			status: true,
			message: 'Success',
			data: {}
		});
	} ).catch( err => {
		res.status( 500 ).send( {
			status: false,
			message: 'Some error occurred while creating data',
			data: {}
		} );
	} );
	
};