const router=require("express").Router();
const File=require("../Model/Model")

router.get("/:uuid",async(req,res)=>{
    const file= await File.findOne(req.params.uuid);
   try {
    if(!file){
        return res.render("download",{error:"The link has been expired"})
    }else{
        return  res.render("download",{
            uuid:file.uuid,
            name:file.fileName,
            size:file.size,
            download:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        })

    }
   } catch (error) {
    return res.render("download",{error:"Some thing went wrong"})
   }
})
module.exports=router