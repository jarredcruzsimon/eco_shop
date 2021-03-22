const User = require('../models/user.js')

//Used to generate sign token
const jwt = require('jsonwebtoken')
const expressJwt = require("express-jwt") //for authorization check
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

exports.signin =(req,res) =>{
    //find user based on email
    const {email,password} = req.body
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User with that email does not exist. Please signup"
            })
        }
        //if user is found make sure user and password matches
        //create authenticate method in user model
        if (!user.authenticate(password)){
            return res.status(401).json({
                error:'Email or password is wrong'
            })
        }

        //generate a signed token with user id and secret
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)

        //persist the token as "t" in cookie with expiry date
        res.cookie('t',token,{expire: new Date()+9999})

        //return response with user and token to frontend client
        const {_id, name,email,role} = user
        return res.json({token, user: {_id, email, name, role}})

    })
}


exports.signout=(req,res)=>{
    res.clearCookie('t')
    res.json({message: "Signout Success"})
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });


