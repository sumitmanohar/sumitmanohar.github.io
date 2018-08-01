const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
app.use(cors())

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const Product=require('./api/routes/product')
const pwd='sumit'
// connect to mongodbcompass
// mongodb+srv://sumit-mongo:sumit@cluster1-suhov.mongodb.net
mongoose.connect('mongodb+srv://sumit-mongo:'+pwd+'@cluster1-suhov.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true 
})

console.log(pwd)
app.use('/product',Product)

app.use((req,res,next)=>{
 const error=new Error('Not Found')
 error.status=404;
 next(error)

})
app.use((error,req,res,next)=>{
   res.status(error.status).json({
       error:{
           message:error.message
       }
   })
})

module.exports=app