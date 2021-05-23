let express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
let catalogModel = require("../schema/catalogSchema");
let orderModel = require("../schema/orderSchema");
let Auth = require("../auth");
router.post("/create-catalog",Auth,async(req,res)=>{
    try {
        console.log(req.user);
        const product=req.body.product;
        const exist=await catalogModel.find({seller_id:req.user.userid});
        let catalog;
        if(exist){
            catalog=exist;
        }else{
            catalog= new catalogModel({
                seller_id:req.user.userid,
            });
        }
        product.forEach(element => {
            catalog[0].products.push(element);
        });
        
        catalog[0].save();
        res.json("Catalog is successfully created");
    }catch (err) {
        console.error(err.message);    
        res.status(500).send("Server Error");
    }
});
router.get("/orders",Auth,async(req,res)=>{   

    try {
        const orders= await orderModel.find({seller_id:req.user.userid},{seller_id:0});
        res.json(orders);
    }catch (err) {
        console.error(err.message);    
        res.status(500).send("Server Error");
    }

});
module.exports = router;