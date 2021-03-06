const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs') //file system
const Product = require("../models/product.js")
const {errorHandler}= require('../helpers/dbErrorHandler.js')
const { replaceOne } = require( '../models/product.js')




//middleware to get single product which can be used for CRUD
exports.productById = (req, res, next, id)=>{
    Product.findById(id)
    .populate('category')
    .exec((err,product)=>{
        if(err || !product){
            return res.status(404).json({
                error:"Product not found",
                from: "productId"
            })
        }
        req.product = product
        next()
    })
}

//READ (CRUD)
exports.read =(req, res)=>{
    req.product.photo = undefined
    return res.json(req.product)
}


//CREATE (CRUD)
exports.create = (req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
           return res.status(400).json({
               error:"Image could not be uploaded"
           })
        }
        //check for all fields
        const {name, description, price, category, quantity, shipping} = fields

        if(!name || !description || !price || !category || !quantity || !shipping ){
            return res.status(404).json({
                error:"All fields are required"
            })
        }

        let product = new Product(fields)
        //1kb = 1000
        //1mb = 1000000
        if(files.photo){
            // console.log("Files Photo:", files.photo)
            //restrict file size to 1mb or less
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:"Image should be less than 1mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result)=>{
            if (err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json(result)
        })
    })
}


//Delete (CRUD)
exports.remove = (req,res)=>{
    let product = req.product
    product.remove((err, deletedProduct)=>{
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            "message": "Product has been deleted"
        })
    })
}


//UPDATE (CRUD)
exports.update = (req, res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
           return res.status(400).json({
               error:"Image could not be uploaded"
           })
        }
        //check for all fields
        // const {name, description, price, category, quantity, shipping} = fields

        // if(!name || !description || !price || !category || !quantity || !shipping ){
        //     return res.status(404).json({
        //         error:"All fields are required"
        //     })
        // }

        let product = req.product
        //extend method is from lodash
        //2 args, the unchanged item, and the changed item
        product = _.extend(product, fields)
        //1kb = 1000
        //1mb = 1000000
        if(files.photo){
            // console.log("Files Photo:", files.photo)
            //restrict file size to 1mb or less
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:"Image should be less than 1mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result)=>{
            if (err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json(result)
        })
    })
}

//queries
// sell / arrival
//by sell = /products?sortBy=sold&order=desc&limit=4  this would only return 4 items
//by arrival = /products?sortBy=createdAt&order=desc&limit=4  this would only return 4 items
//if no params are sent then all products all returned

exports.list = (req,res)=>{
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy,order]])
        .limit(limit)
        .exec((err, products)=>{
            if (err){
                return res.status(400).json({
                    message:"Product not found",
                    from: "list"
                })
            }
            res.json(products)
        })

}

//show related items to the current list
//It will find the product based on the request product category
//other products that have the same category will be returned
exports.listRelated = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    //$ne means not encluded, so we are finding all products except for the current product,
    //then we are finding all products based on category
    Product.find({_id:{$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products)=>{
            if (err){
                return res.status(400).json({
                    message:"Products not found",
                    from: "listRelated"
                })
            }
            res.json(products)
        })


}


//List all categories
exports.listCategories = (req,res)=>{
    //in the curly braces we can pass queries, for now the value is null
    Product.distinct("category", {}, (err, categories)=>{
        if (err){
            return res.status(400).json({
                "message": "Categories not Found"
            })
        }
        res.json(categories)
    })

}


/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

//will return product photo then continue
//works as middleware

exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        //we have to set the content type since it isn't JSON
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.listSearch=(req,res)=>{
    //create query object to hold source value and category value
    const query = {}
    //assign search value to query.name
    if(req.query.search){
        query.name = {$regex: req.query.search, $options: 'i'}
        //assign category value to query.category
        if(req.query.category && req.query.category != 'All'){
            query.category = req.query.category
        }
        //find the product based on query object with two properties
        //search and category
        Product.find(query,(err,products) =>{
            if (err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        }).select('-photo')
    }
}

exports.decreaseQuantity =(req,res,next)=>{
    let bulkOps = req.body.products.map((item)=>{
        return{
            updateOne: {
                filter:{_id: item._id},
                update:{$inc: {quantity: -item.count, sold: +item.count}}
            }
        }
    })
    Product.bulkWrite(bulkOps, {}, (error, products)=>{
        if (error){
            return res.status(400).json({
                error: 'Could not update product'
            })
        }
        next()
    })
}