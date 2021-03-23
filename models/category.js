const mongoose = require('mongoose')


//creating a new schema within Mongoose. Trim means that any space at the start or end will be trimmed off. 
//This schema is for the categories
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
},{timestamps:true})

module.exports = mongoose.model("Category", categorySchema)