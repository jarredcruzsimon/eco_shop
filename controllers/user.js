const User = require('../models/user.js')
const {errorHandler}= require('../helpers/dbErrorHandler.js')

exports.signup = (req,res) =>{
    console.log('req.body',req.body)
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        //setting the salt and hashed password as undefined so they are not passed with the response. 
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })
    })
}