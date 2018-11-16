const mongoose = require( 'mongoose' );

const SyncDBLogSchema = mongoose.Schema( {
	FLAG_UPDATE: String,
	NUMROWS: Number,
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

module.exports = mongoose.model( 'SyncDBLog', SyncDBLogSchema, 'T_LOG_SYNC_DB' );