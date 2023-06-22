const mongoose =require("mongoose")

const usercontacts=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("usercontacts",usercontacts)