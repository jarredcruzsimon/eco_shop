const User = require('../models/user.js')

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