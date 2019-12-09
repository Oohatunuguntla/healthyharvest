const express=require("express");
const router=express.Router();


const servicecontroller=require("../controllers/servicecontroller");
router.post('/service/:email',servicecontroller.postservice);
router.post('/pesticide/:email',servicecontroller.postpesticideservice);
router.get('/crop_available',servicecontroller.crop_available);
router.get('/required_pesticides',servicecontroller.required_pesticides);
router.get('/newsfeedservice',servicecontroller.newsfeedservice);
module.exports=router;