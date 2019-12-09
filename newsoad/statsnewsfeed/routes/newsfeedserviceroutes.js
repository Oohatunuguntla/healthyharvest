const express=require("express");
const router=express.Router();
const newsfeedservicecontroller=require("../controllers/newsfeedservicecontroller.js");
router.get('/',(request,response)=>{
    response.render('statsnewsfeed',{layout:false});
})
router.get('/newsfeed_service',newsfeedservicecontroller.newsfeed_service)
module.exports=router;