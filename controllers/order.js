const {Order, CartItem } = require("../models/order.js")
const { errorHandler } = require("../helpers/dbErrorHandler.js")


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