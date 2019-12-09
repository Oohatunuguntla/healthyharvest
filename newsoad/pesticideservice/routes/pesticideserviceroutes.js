const express=require("express");
const router=express.Router();
const pesticideservicecontroller=require("../controllers/pesticideservicecontroller.js");
router.get('/',(request,response)=>{
    response.render('requiredpesticide',{layout:false});
})
router.get('/pesticide_service',pesticideservicecontroller.pesticide_service)
module.exports=router;