const express = require('express');
const mongodb=require('./mongoDB.js');
const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const buyerRouter = require("./routes/buyer");
const sellerRouter = require("./routes/seller");
let buyerModel = require("./schema/buyerSchema");
let sellerModel = require("./schema/sellerSchema");
const app = express();
require('dotenv').config()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connection mongoDB database
mongodb();


app.get('/',(req,res)=> res.send('api-server'));



//Api for buyer and seller to register 
// use password encryption with salting
app.post("/api/auth/register", async (req, res)=> {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let type =req.body.type;
        const hash= await bcrypt.hash(password, 10);
        if(type=="buyer"){
                    let buyerDetails = new buyerModel({
                        username: username,
                        password: hash,
                      });
                      await buyerDetails.save();
                      res.json("Register sucessful as buyer");
                }else{
                    let sellerDetails = new sellerModel({
                        username: username,
                        password: hash,
                      });
                      await sellerDetails.save();
                      res.json("Register sucessful as seller");
                }
      
    } catch (error) {
        console.log(error);
    }
    
});


//for login API 
// use password encryption with salting
app.post("/api/auth/login", async (req, res) => {
    let username = req.body.username;
    let type=req.body.type;
    let user;
    if(req.body.type=="buyer"){
        user=await buyerModel.find({username:username});
    }else{
        user=await sellerModel.find({username:username});
    }
    if(user){
        bcrypt.compare(
            req.body.password,
            user[0].password,
            async (err, result) => {
              if (err) {
                res.json({
                  message: "Wrong Password",
                });
              }
              if (result) {
               
                let token = jwt.sign(
                  {
                    username: user[0].username,
                    userid: user[0]._id,
                    type:type
                  },
                  process.env.SERCET,
                  {
                    expiresIn: "8h",
                  }
                );
                res.status(200).json({
                  message: "User Found",
                  token: token,
                });
                console.log('login');
              } else {
                res.json({
                  message: "Incorrect Username/Password",
                });
              }
            }
          );
    }
          
});


//for handling API for buyer
app.use("/api/buyer/", buyerRouter);

//for handling API for seller
app.use("/api/seller/", sellerRouter);
app.listen(5000,()=> console.log("sever running on 5000"));