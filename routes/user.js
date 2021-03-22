const { response } = require('express')
const express = require('express')

const router = express.Router()

//requireSign in will secure a route to only those signed in
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js')


const { userById } = require('../controllers/user.js')


//routes

router.get("/test/:userId",requireSignin, isAuth, isAdmin, (req,res)=>{
    res.json({
        user: req.profile
    })
})

router.param('userId', userById)


module.exports = router