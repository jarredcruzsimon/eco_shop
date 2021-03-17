const express = require('express')

//import mongoose
const mongoose =  require('mongoose')

//import user router
const userRoutes = require('./routes/user.js')

//import body-parser
const bodyParser = require('body-parser')

//import cookie-parser
const cookieParser = require('cookie-parser')

//import morgan
const morgan = require('morgan')

//import express validator
const expressValidator = require('express-validator')


const app = express()




//---------------------------------------------------------------------
//load env variables
require('dotenv').config()


//---------------------------------------------------------------------
//db connection connect takes two args
mongoose.connect(
    process.env.DATABASE,
    { useNewUrlParser: true,
      useUnifiedTopology: true 
})
.then(()=> console.log('DB Connected'))


//---------------------------------------------------------------------
//middlewares

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser)
app.use(expressValidator())

//---------------------------------------------------------------------
//Routes
app.use("/api",userRoutes)


//---------------------------------------------------------------------
const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})