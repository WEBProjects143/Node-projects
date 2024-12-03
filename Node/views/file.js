require("dotenv").config();
const router=require("express").Router();
const path=require("path");
const File=require("../Model/Model");
const send=require("../services/emailSender")
router.get("/:uuid",async(req,res)=>{
    const file=await File.find({uuid:req.params.uuid});
    if(!file){
        return res.render("download",{error:"File not found"});
    }else{
        const filepath=path.join(__dirname,"../public/docs",`${file[0].fileName}`)
        return res.download(filepath,(error)=>{
            if(error){
                console.log("Error : "+ error)
            }
        })
    }

})

router.post("/send",async(req,res)=>{
    const {uuid,emailTo,emailForm}=req.body;
    if(!uuid||!emailTo||!!emailForm){
        return res.status(422).send({error:"All fields are required"});
    }
    const file =await File.findOne({uuid:uuid});
    if(file.sender){
        return res.status(500).send({error:"Email already exist"})

    }

    file.send=emailForm;
    file.receiver=emailTo;
    const response= await file.save();

    send({
        from:emailForm
        ,to:emailTo,
        subject:"Email for testing purpose",
        text:`${emailFrom} share a file with you`,
        html:require("../services/emailTemplate")({
            emailFrom:emailForm,
            downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size:parseInt(filesize/1000)+'kb',
            expires:'24 hours'
        })
    })
})
module.exports=router;