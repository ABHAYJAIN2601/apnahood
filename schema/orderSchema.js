const mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({

    seller_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"seller"
    },
    buyer_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"buyer"
    },
    products:[{
        name:{
            type:String,
        },
        price:{
            type:Number,
        },
        quantity:{
            type:Number,
        }
    }]
});

var orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;