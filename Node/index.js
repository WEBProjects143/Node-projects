const express=require("express");
const connect=require("./DB/db");
const path=require("path");
const app= new express()
//Template engine
app.set("views",path.join(__dirname,'/views'));
app.set("view engine",'ejs')
console.log(path.join(__dirname,'/views'))
//Router
app.use("/api/files",require("./Routers/Route"));
app.use("/files",require("./Routers/show"));
app.use("/files/download",require("./views/file"));
app.use("/api/files",require("./views/file"));
app.listen(5000,async()=>{
  await connect()
  console.log("Server is connected..........")
})
