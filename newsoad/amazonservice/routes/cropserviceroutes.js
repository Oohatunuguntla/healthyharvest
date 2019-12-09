const express=require("express");
const request = require("request")
const router=express.Router();
const cropservicecontroller=require("../controllers/cropservicecontroller.js");
router.get('/',(request,response)=>{
    response.render('availablecrop',{layout:false});
})
router.get('/crop_service',cropservicecontroller.crop_service)
module.exports=router;