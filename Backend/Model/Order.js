const mongoose=require ('mongoose');
const orderschema=new mongoose.Schema({
    user_id:String,
    product_id:Number,
    count:Number,
    size:String,
    discount:{type:Number,default:0},
    status:{type:Boolean , required:true , default:false},
})
const Order=mongoose.model("Order",orderschema);
module.exports = Order;