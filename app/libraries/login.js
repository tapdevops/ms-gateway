const employeeHRISModel = require( '../models/employeeHRIS.js' );

module.exports.checkHRIS = function ( username ) {


	reslt = employeeHRISModel.findOne({ EMPLOYEE_USERNAME: 'nicholas.budihardja' }) .exec(function (err, user){    
		// User result only available inside of this function!
		//console.log(user) // => yields your user results
	})

// User result not available out here!
console.log(reslt) // => actually set to return of .exec (undefined)

	//var query = employeeHRISModel.findOne( { EMPLOYEE_USERNAME: 'nicholas.budihardja' } );
	//query.select('EMPLOYEE_USERNAME EMPLOYEE_NIK');
	//query.exec(function ( err, datas ) {
	//	if ( err ) {
	//		console.log( 'BS' );
	//	}
	//	else {
	//		console.log( 'AS' );
	//	}
	//});
};