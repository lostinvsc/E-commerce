const mongoose=require ('mongoose');
const couponschema=new mongoose.Schema({
name:String,
discount:Number,
})
const Coupon=mongoose.model("Coupon",couponschema);
module.exports = Coupon;