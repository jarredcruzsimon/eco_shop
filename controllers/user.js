const User = require('../models/user.js')
const {errorHandler}= require('../helpers/dbErrorHandler.js')
const {Order} = require("../models/order.js")

exports.userById = (req, res, next, id) =>{
    User.findById(id).exec((err, user)=>{
        if (err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    })
}

//READ (CRUD) user profile
exports.read= (req, res)=>{
    req.profile.hashed_password = undefined //Null so that we do not pass the hashed password in profile
    req.profile.salt = undefined //Null so that we do not pass the salt in profile

    return res.json(req.profile)
}


//UPDATE (CRUD)
exports.update= (req, res)=>{
    //this will take the user and set it to what is being passed through the requested body.
    //this can include any of the fileds within the profile
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true},
        (err, user)=>{
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                })
            }
            user.hashed_password = undefined //Null so that we do not pass the hashed password in profile
            user.salt = undefined //Null so that we do not pass the salt in profile

            //return the user as a json response
            res.json(user)
        })
        
}

exports.addOrderToUserHistory = (req,res,next) =>{
    let history = []
    // console.log('ORDER:',req.body)
    req.body.products.forEach((item)=>{
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.transaction_id,
            amount: req.body.amount
        })
    })
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push:{history: history}},
        {new:true},
        (error,data)=>{
            if(error){
                return res.status(400),json({
                    error: 'Could not update user purchase history'
                })
            }
            next()
        }

    )
}

exports.purchaseHistory =(req,res)=>{
    Order.find({user:req.profile._id})
    .populate('user','_id name')
    .sort('-created')
    .exec((err,orders)=>{
        if(err){
            return res.status(400),json({
                error: errorHandler(err)
            })
        }else{
            
            res.json(orders)
        }
    })
}
