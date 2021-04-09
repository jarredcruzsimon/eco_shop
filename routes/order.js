const express = require('express')
const router = express.Router()
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js')
const { userById, addOrderToUserHistory } = require('../controllers/user.js')
const { create, listOrders } = require('../controllers/order.js')
const { decreaseQuantity } = require('../controllers/product.js')

router.post('/order/create/:userId',
    requireSignin,
    isAuth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
)

router.get('/order/list/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    listOrders
)

router.param('userId', userById)


module.exports = router