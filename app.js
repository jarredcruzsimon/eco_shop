//---------------------------------------------------------------------
//load env variables
require('dotenv').config()

//---------------------------------------------------------------------
const express = require('express')

//import mongoose
const mongoose =  require('mongoose')


// no need to import bodyparser is built into express
//import body-parser
// const bodyParser = require('body-parser')

//import cookie-parser
const cookieParser = require('cookie-parser')

//import morgan
const morgan = require('morgan')

//import express validator
const expressValidator = require('express-validator')

//import auth router
const authRoutes = require("./routes/auth.js")

//import user router
const userRoutes = require("./routes/user.js")


const app = express()


//---------------------------------------------------------------------
//db connection connect takes two args
mongoose.connect(
    process.env.DATABASE,
    { useNewUrlParser: true,
      useUnifiedTopology: true 
})
.then(()=> console.log('DB Connected'))
.catch((err)=>{console.log(err)})


//---------------------------------------------------------------------
//middlewares
// app.use(bodyParser.json())

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(expressValidator())

//---------------------------------------------------------------------
//Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)


//---------------------------------------------------------------------
const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})