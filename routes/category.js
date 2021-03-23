const express = require('express')

const router = express.Router()


const { create } = require('../controllers/category.js')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js')
const { userById } = require('../controllers/user.js')


//routes
//we have assigned middleware to our create route also we we have added a userId param
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)


router.param('userId', userById)

module.exports = router