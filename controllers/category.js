//import category modle
const Category = require("../models/category.js")

const {errorHandler}= require('../helpers/dbErrorHandler.js')

//obtain a single category
exports.categoryById = (req,res, next, id) =>{
    Category.findById(id).exec((err, category)=>{
        if(err || !category){
            return res.status(400).json({
                error: 'Category does not exist'
            })
        }
        req.category = category
        next()
    })
}

//CREATE (CRUD)
exports.create = (req,res) =>{
    const category = new Category(req.body)
    category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data })
    })
}


//READ (CRUD)
exports.read = (req,res) =>{
    return res.json(req.category)
}

//UPDATE (CRUD)
exports.update = (req,res) =>{
    const category = req.category
    category.name = req.body.name
    category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

//REMOVE (CRUD)
exports.remove = (req,res) =>{
    const category = req.category
    category.remove((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message:"Category Deleted"
        })
    })
}

//LIST
exports.list = (req,res) =>{
    Category.find().exec((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}