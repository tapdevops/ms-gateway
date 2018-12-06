const mongoose = require( 'mongoose' );

const ViewUserSchema = mongoose.Schema( {});

module.exports = mongoose.model( 'ViewUser', ViewUserSchema, 'VIEW_USER' );