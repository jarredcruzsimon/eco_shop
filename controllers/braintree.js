const User = require('../models/user.js')
const braintree = require('braintree')
require('dotenv').config()



//use gateway to connect to braintree
const gateway = new braintree.BraintreeGateway ({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.BRAINTREE_MERCHANT_ID,
    publicKey:    process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:   process.env.BRAINTREE_PRIVATE_KEY
});


//generate token
exports.generateToken = (req,res)=>{
    gateway.clientToken.generate({},function(err,response){
        if(err){
            res.status(500).send(err)
        }else{
            res.send(response)
        }
    })
}