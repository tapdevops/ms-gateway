const mongoose = require( 'mongoose' );

const ContentSchema = mongoose.Schema( {
	CONTENT_CODE: String,
	GROUP_CATEGORY: String,
	CATEGORY: String,
	CONTENT_NAME: String,
	CONTENT_TYPE: String,
	UOM: String,
	FLAG_TYPE: String,
	URUTAN: String,
	INSERT_USER: String,
	DATE_LOGIN: {
		type: Date,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'Content', ContentSchema, 'TM_CONTENT' );