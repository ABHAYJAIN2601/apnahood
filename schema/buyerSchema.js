const mongoose = require('mongoose');
var buyerSchema = new mongoose.Schema({

	username: {
		type: String,
		required: true,
		index: {
			unique: true
		},
	},
	password: {
		type: String,
		required: true
	},
    orders:{
        type:mongoose.Schema.Types.ObjectId
    },
	date: {
		type: Date,
		default: Date.now
	}
});

var userModel = mongoose.model('buyer', buyerSchema);
module.exports = userModel;