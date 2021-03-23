const express = require('express')

const router = express.Router()


const { create, categoryById, read, update, remove, list } = require('../controllers/category.js')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js')
const { userById } = require('../controllers/user.js')


//routes
//we have assigned middleware to our create route also we we have added a userId param
router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update)
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove)
router.get('/categories', list)


router.param('categoryId', categoryById)
router.param('userId', userById)

module.exports = router