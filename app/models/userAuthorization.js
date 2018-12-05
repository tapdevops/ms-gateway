const mongoose = require( 'mongoose' );

const UserAuthorizationSchema = mongoose.Schema( {
	MODULE_CODE: String,
	PARAMETER_NAME: String,
	STATUS: Number,
	NO_URUT: Number,
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

module.exports = mongoose.model( 'UserAuthorization', UserAuthorizationSchema, 'T_USER_AUTHORIZATION' );