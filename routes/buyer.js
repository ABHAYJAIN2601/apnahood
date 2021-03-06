let express = require("express");
let router = express.Router();
let buyerModel = require("../schema/buyerSchema");
let catalogModel = require("../schema/catalogSchema");
let orderModel = require("../schema/orderSchema");
let Auth = require("../auth");


//get request to see all seller 
router.get("/list-of-sellers",async(req,res)=>{

    try{
        const sellers=await buyerModel.find({},{password:0});
        res.json(sellers);
    }catch (err) {
        console.error(err.message);    
        res.status(500).send("Server Error");
    }
    

});


//get request for buyer to seller catalog 
router.get("/seller-catalog/:seller_id",async(req,res)=>{
    try{
        const sellerCatalog=await catalogModel.find({seller_id:req.params.seller_id},{seller_id:1,products:1});
        res.json(sellerCatalog);
    }catch (err) {
        console.error(err.message);    
        res.status(500).send("Server Error");
    }
    
});


//post request for buyer to place order by with protected api 
//In line 41 product is array of object and each object contain name and quantity of product
router.post("/create-order/:seller_id",Auth,async(req,res)=>{
    try{
        const product=req.body.product;
        const order=new orderModel({
            seller_id:req.params.seller_id,
            buyer_id:req.user.userid
        });
        product.forEach(element => {
            order.products.push(element);
        });
        order.save();
        res.json("Order successfully placed");
    }catch (err) {
        console.error(err.message);    
        res.status(500).send("Server Error");
    }
});


module.exports = router;