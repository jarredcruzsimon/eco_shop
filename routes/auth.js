const express = require('express')

const router = express.Router()

//requireSign in will secure a route to only those signed in
const { signup, signin, signout, requireSignin } = require('../controllers/auth.js')
const { userSignupValidator } = require('../validator/index.js')

//routes
router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)



module.exports = router