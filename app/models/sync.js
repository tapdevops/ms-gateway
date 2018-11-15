const mongoose = require( 'mongoose' );

const SyncSchema = mongoose.Schema( {
	TABLE_NAME: String,
	START_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	},
	END_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'Sync', SyncSchema, 'T_LOG_SYNC' );