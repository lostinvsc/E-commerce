const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    id:Number,
    name:String,
    old_price:Number,
    new_price:Number,
    category:String,
    image:String,
    tag:[],
    reviews:[{ by:String , content:String }]
})

const Product = mongoose.model('Product',productSchema);
module.exports=Product;