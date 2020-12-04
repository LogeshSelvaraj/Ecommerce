const express=require("express")
const router=express.Router()

const {createOrUpdateUser,getUser}=require("../controllers/auth")
const { authCheck,authAdminCheck } = require("../middlewares/auth");

router.post("/create-or-update-user",authCheck,createOrUpdateUser)

router.post("/get-user",authCheck,getUser)

router.post("/get-admin", authAdminCheck);

// middelwares testing
router.get("/testing",authCheck,(req,res)=>{
    res.send("response send by the api to the client")
})

module.exports=router