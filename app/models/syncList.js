const mongoose = require( 'mongoose' );

const SyncListSchema = mongoose.Schema( {
	ID: String,
	CODE: String,
	TABLE_NAME: String,
	INSERT_DATE: Date
});

module.exports = mongoose.model( 'SyncList', SyncListSchema, 'TM_SYNC_LIST' );