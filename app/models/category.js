const mongoose = require( 'mongoose' );

const CategorySchema = mongoose.Schema( {
	CATEGORY_NAME: String,
	ICON: String
});

module.exports = mongoose.model( 'Category', CategorySchema, 'T_CATEGORY' );