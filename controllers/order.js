const {Order, CartItem } = require("../models/order.js")
const { errorHandler } = require("../helpers/dbErrorHandler.js")


exports.orderById =(req, res, next, id) =>{
    Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order)=>{
        if(err || !order){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        req.order = order
        next()
    })
}

exports.create = (req, res) =>{
    // console.log("Create order",req.body)
    // return res.json({})
    req.body.user = req.profile._id
    // console.log(req.body)
    const order = new Order(req.body)
    order.save((error, data)=>{
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.listOrders =(req,res) =>{
    
    Order.find()
    .populate('user','_id name address')
    .sort('-created')
    .exec((error,orders)=>{
    
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(orders)
    })
}

exports.updateOrderStatus =(req,res) =>{
    console.log('controllers',req.body)
    Order.updateMany(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (error,order)=>{
            if(error){
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            console.log('order', order)
            res.json(order)
        }
    )
    
}




exports.getStatusValues =(req,res)=>{
    res.json(Order.schema.path('status').enumValues)
}