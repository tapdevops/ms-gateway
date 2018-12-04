const mongoose = require( 'mongoose' );

const ParameterSchema = mongoose.Schema( {
	PARAMETER_GROUP: String,
	PARAMETER_NAME: String,
	DESC: String,
	NO_URUT: String,
	INSERT_USER: String,
	INSERT_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'Parameter', ParameterSchema, 'TM_PARAMETER' );