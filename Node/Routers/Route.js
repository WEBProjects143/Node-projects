require("dotenv").config();
const router=require("express").Router();
const multer=require("multer");
const path=require("path");
const File=require("../Model/Model");
const {v4:uuid4}=require("uuid");

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/docs/")
    },filename:(req,file,cb)=>{
        cb(null,file.originalname+"-"+Date.now())

    }
})
let upload=multer({
    storage,
    limits:{fieldSize:100000*100}
}).single("file")

router.post("/",(req,res)=>{
    //request varification
 
    //Upload file
    upload(req,res,async(err)=>{
        if(!req.file){
            res.send("404").json({error:"File field should not be empty"})
        }
        if(err){
            return res.send('400').json({
                error:err.message
            });
        }
        //store in the database
        const db = new File({
            fileName:req.file.filename,
            path:req.file.path,
            filesize:req.file.size,
            uuid:uuid4()
        });
        const response=await db.save();
        return res.json({files:`${process.env.APP_BASE_URL}/file/${response.uuid}`})

    })

})

module.exports=router;