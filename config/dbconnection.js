const mongoose =require("mongoose")


const connectDb =async()=>{
    try{
  const connect =await mongoose.connect(process.env.CONNECTION_STRING)
   console.log("Data base connected...")
    }catch(err){
        console.log(err.message)
    }
}

module.exports=connectDb