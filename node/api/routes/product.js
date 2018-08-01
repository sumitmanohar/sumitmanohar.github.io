const express=require('express')
const router=express.Router()
const Product = require("../model/product");
const mongoose = require("mongoose")

router.get('/',(req,res,next)=>{
  Product.find()
  .exec()
  .then(data=>{
      console.log(data)
    //   const response={
    //       quantity:data.length,
    //       product:data.map(doc=>{
    //       return {
    //           name:doc.name,
    //           price:doc.price,
    //           ID:doc._id,

    //       }
    //   })}
      res.status(200).json({
          getData:data
      })
  })
  .catch(err=>{
      console.log(err)
      res.status(500).json({
          error:err
      })
  })
})

router.post('/',(req,res,next)=>{
  
    var product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
          });
          product.save()
        //   product.save((err,response)=>{
        //       if(err){
        //            console.log(err)
        //       }else{
        //         // res.setHeader('content-type', 'application/json');
        //         // res.send(JSON.stringify({json: response.result}));
        //           console.log(response)
        //         //   res.send(response)
        //         //   response.end();
        //       }
        //   })
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct:{
                    name:result.name,
                    price:result.price,
                    ID:result._id,
                    request:{
                        method:'POST',
                        url:`http://localhost:3000/product/${result._id}`

                    }
                }
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
})

router.put('/:productID',(req,res,next)=>{
    // res.json({
    //     message:'hi'
    // })
  const putID=req.params.productID
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
  Product.update({ _id: putID }, {name:req.body.newname,price:req.body.newprice} )
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
})

router.get('/:productID',(req,res,next)=>{
    const getID=req.params.productID
    Product.findById(getID)
    .select('name price _id')
    .exec()
    .then(data=>{
        console.log(data)
        res.status(200).json({
            message:"Handling GET request to /product/:productID",
            createdProduct:{
                name:data.name,
                price:data.price,
                ID:data._id
            }
        })
        
})
.catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
})
})

router.delete('/:productID',(req,res,next)=>{
   const id=req.params.productID
   console.log(id)
   Product.remove({_id:id})
   .exec()
   .then(data=>{
       console.log(data)
       res.status(200).json({
           message:"Handling DELETE request to /product/:productID",
           deleteData:data
       })
   })
   .catch(err=>{
       console.log(err)
       res.status(500).json({
           error:err
       })
   })

})

module.exports=router