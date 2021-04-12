const { response } = require('express')
const express = require('express')

const router = express.Router()

//requireSign in will secure a route to only those signed in
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js')


const { userById, read, update, purchaseHistory } = require('../controllers/user.js')


//routes

router.get("/test/:userId",requireSignin, isAuth, isAdmin, (req,res)=>{
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory)

router.param('userId', userById)


module.exports = router