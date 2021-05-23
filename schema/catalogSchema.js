const mongoose = require('mongoose');
var catalogSchema = new mongoose.Schema({

    seller_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"seller"
    },
    products:[{
        name:{
            type:String,
        },
        price:{
            type:Number,
        }
    }]
});

var catalogModel = mongoose.model('catalog', catalogSchema);
module.exports = catalogModel;