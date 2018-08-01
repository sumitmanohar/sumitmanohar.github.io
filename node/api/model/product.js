// const mongoose = require('mongoose');

// const productSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: String,
//     price: Number
// });

// module.exports = mongoose.model('Product', productSchema);
const mongoose= require('mongoose')

module.exports=mongoose.model('Product',{
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String, require:true},
    price:{type:Number, require:true}
})

// module.exports=mongoose.model('Product',productSchema)