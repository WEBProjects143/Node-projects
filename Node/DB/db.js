require("dotenv").config()
const mongoose=require("mongoose");
const connect=()=>{
    mongoose.connect(process.env.URL,{useUnifiedTopology:true})
    const connectdb=mongoose.connection;
    connectdb.once('open',()=>{
        console.log("Database connected...")

    }) 
    connectdb.on("disconnected",()=>{
        console.log("Disconnected from MongoDB")
    })
}
module.exports= connect;