const express = require('express')

const router = express.Router()


const { create, productById, read, remove, update, list, listRelated, listCategories, listSearch, listBySearch, photo } = require('../controllers/product.js')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js')
const { userById } = require('../controllers/user.js')


//routes
//we have assigned middleware to our create route also we we have added a userId param
router.get('/product/:productId', read)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)
router.get('/products',list)
router.get("/products/search", listSearch)
router.get('/products/related/:productId',listRelated)
router.get('/products/categories', listCategories)
router.post("/products/by/search", listBySearch)
router.get('/product/photo/:productId', photo)


router.param('userId', userById)
router.param('productId', productById)

module.exports = router