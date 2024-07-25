const mongoose=require("mongoose")

let userSchema =new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    address:{
locality:String,
flat:String,
state:String,
city:String,
pincode:Number,
    },
})

const User=mongoose.model('User',userSchema)
module.exports=User;