const mongoose = require('mongoose');
var sellerSchema = new mongoose.Schema({

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
    catalog:{
        type:mongoose.Schema.Types.ObjectId,ref:"catalog"
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,ref:"order"
    },
	date: {
		type: Date,
		default: Date.now
	}
});

var sellerModel = mongoose.model('seller', sellerSchema);
module.exports = sellerModel;