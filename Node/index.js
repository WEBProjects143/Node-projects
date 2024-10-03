const express=require('express');
const ejs=require('ejs');
const qrcode=require('qrcode')
const path=require("path")
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'learn'))
const port=5000;
app.post("/scan",(req,res)=>{
    const inner_text=req.body.text
  qrcode.toDataURL(inner_text,(err,src)=>{
    res.render('Scan',{
        qr_code:src,    
    })
  })
})
app.get("/",(req,res)=>{
    res.render("index")
})
app.listen(port,()=>{
 console.log("Server is connected.....")
})
