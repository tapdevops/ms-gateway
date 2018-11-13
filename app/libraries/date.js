let date = require('date-and-time');
module.exports.parser = function ( value, validation ) { 
	var isDate = function( value ) {
		return ( ( new Date( date ) ).toString() !== "Invalid Date" ) ? true : false;         
	}

	if ( isDate !== false ) {
		return date.parse( value, validation );;
	}
	else {
		return '';
	}
};