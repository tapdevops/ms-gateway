const mongoose = require( 'mongoose' );

const ModulesSchema = mongoose.Schema( {
	MODULE_CODE: String,
	MODULE_NAME: String,
	PARENT_MODULE: String,
	ITEM_NAME: String,
	ICON: String,
	STATUS: String,
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

module.exports = mongoose.model( 'Modules', ModulesSchema, 'T_MODULE' );