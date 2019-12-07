const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const User=require("../models/user");
const Users = mongoose.model('user');
const Verificationtoken=require("../models/tokenverification");
const jwt=require("jsonwebtoken");
const usercontroller=require("../controllers/user");
const availrequestdetails = mongoose.model('availrequestdetails');
//const Service=require("../models/service");
const Service = mongoose.model('service');

router.get('/map',usercontroller.user_map); 

router.post('/signup',usercontroller.user_signup);

router.post('/login',usercontroller.user_login);

router.get('/view_profile',usercontroller.view_profile);

router.post('/edit_profile',usercontroller.edit_profile);

router.get("/viewposts",usercontroller.user_view);

router.post("/service",usercontroller.user_service);

router.get('/confirmation/:token', usercontroller.confirmationPost);
//router.post('/resend', usercontroller.resendTokenPost);

router.post('/signup',(request,response)=>{
    response.render('signup',{layout:false});
})

router.get('/login',(request,response)=>{
    response.render('login',{layout:false});
})


router.post('/edit-profilecustomers',(request,response)=>{
    var user = req.user();
    response.render('edit-profilecustomers',{layout:false,user: User});
})

router.post('/edit-profileagriexperts',(request,response)=>{
    var user = req.user();
    response.render('edit-profileagriexperts',{layout:false, user: User});
})

router.post('/edit-profilefarmers',(request,response)=>{
    var user = req.user();
    response.render('edit-profilefarmers',{layout:false,user: User});
})

router.get('/home',(request,response)=>{
    response.render('index',{layout:false});
})

router.get('/farmer/:email',(request,response)=>{
    response.render('farmer',{'email':request.params.email,layout:false});
})

router.get('/agro/:email',(request,response)=>{
    response.render('agri_expert',{'email':request.params.email,layout:false});
})

router.get('/customer/:email',(request,response)=>{
    response.render('customer',{'email':request.params.email,layout:false});
})


router.get('/list/:email',function(req,res){
    console.log(req.params.email)
    Users.find({email : req.params.email},(err,citydoc)=>{
          
            var currlogin = citydoc[0]
            console.log(citydoc[0])
            console.log(currlogin['city'])
            Users.find({type : 'agricultureexpert', city : currlogin['city']},(err,docs)=>{
                console.log(docs)
                // if(err){
                //     console.log('err'+err);
                //     return
                // }
                // console.log(docs[1]['_id'])
                // if(availrequestdetails.length>0){
                //     for(var i=0;i<=Object.keys(docs).length-1;i++){
                //         console.log(availrequestdetails.agroexperti)
                //         if(docs[i]['_id']!=availrequestdetails.agroexpertid){
                //             var doc=docs[i]
                //             availreq=new availrequestdetails();
                //             availreq.farmerid=currlogin['_id'];
                //             availreq.agroexpertid=doc['_id'];
                //             availreq.requested=false;
                //             availreq.save((err,docs)=>{
                //                 if(!err){
                //                     console.log('added');
                //                 }
                //                 else{
                //                     console.log('err'+err)
                //                     return
                //                 }    
                //             })
                        
                //         }
                //         //return
                //         else{
                //             if(avaiavailrequestdetails.requested==false){
                //                 res.render('farmer',{
                //                     list: docs,
                //                     layout:false
                //                 })
                //             }
                //             return


                //         }
                //     }
                // }
                // else{
                //     var availreq = new availrequestdetails();
                //     var doc=docs[i]
                //     availreq.farmerid=currlogin['_id'];
                //     availreq.agroexpertid=doc['_id'];
                //     availreq.requested=false;
                //     availreq.save((err,docs)=>{
                //         if(!err){
                //             if(avaiavailrequestdetails.requested==false){
                //                 console.log('added when 0')
                //                 res.render('farmer',{
                //                     list: docs,
                //                     layout:false
                //                 })
                //             }
                //         }
                //         else{
                //             console.log('err'+err)
                //             return
                //         }
                //     })
                // }
                for(var i=0;i<=Object.keys(docs).length-1;i++){

                    console.log(i)
                    var doc=docs[i]
                    console.log(doc)
                    console.log(doc['_id'])                       
                    var availreq = new availrequestdetails();
                    availreq.farmerid=currlogin['_id'];
                    availreq.agroexpertid=doc['_id'];
                    availreq.requested = false;
                    availreq.save((err,docks)=>{
                        if(err){
                            console.log('err'+err);
                            return
                        }
                        
                        console.log(docs)
                        res.render('farmerreq',{
                            list: docs,
                            layout:false
                        })

                            //console.log("a")
                        
                    });
                   // return

                    }
                    return
                
            }) 
                

    })

});

router.get('/list/sentreq/:id',function(req,res){
    console.log(req.params._id)
    console.log('req sent')
    //var reqdetails= new requestdetails();
    //reqdetails.farmerid = req.params.id;
    //reqdetails.agroexpertid = req.params.id;

    // availrequestdetails.findOne({agroexpertid : req.params.id}, (err,doc)=>{
    //     console.log(availrequestdetails.agroexpertid)
    //     if(!err){
    //         console.log('entered function')
    //         console.log(doc)
            // availrequestdetails.findByIdAndUpdate({agroexpertid:req.params.id},function(err,result){
            //     availrequestdetails.requested='true';
            //     console.log('modified')
            // })
            var availreqts=availrequestdetails();
            //availrequestdetails.find({agroexpertid:req.params.id},function(err,result){
                // availreqts.requested = true;
                // availreqts.agroexpertid=req.params.id;
                // availreqts.farmerid=availreqts.f
                availrequestdetails.findOneAndUpdate({agroexpertid:req.params.id},{requested:true},(err,docs)=>{
                    if(err){
                        console.log('err'+err)
                        return
                    }
                    console.log('changed')
                    console.log(docs)
                    res.json('reqest sent')
                })
                //console.log('changed')
           // })
            //availrequestdetails.findOneAndDelete({})
            //res.json('added')

    //     }
    //     else{
    //         console.log('err'+err)
    //     }
        
    // })
    // reqdetails.save((err,docs) =>{
    //      if(!err){
    //          res.json('added')
    //      }
    //      else{
    //          console.log('err'+err)
    //      }
    // })

})

router.get('/list/agriexp/:id',function(req,res){
    availrequestdetails.find({agroexpertid:req.params.id,requested:true},function(err,doc){
        
        for(var i=0;i<=Object.keys(doc).length;i++){
            var documents=doc[i]
            //console.log(docs['farmerid'])
            // Users.find((err,ddd)=>{
            //     console.log(ddd)
            // })
            
        
            Users.find({_id : documents['farmerid'],},function(err,result){
                console.log(result)
                if(!err){
                    res.render('reqdis',{
                        user:result,
                        layout:false
                    })
                }
            })

        }
        // if(!err){
        //     res.render('reqdis',{
        //         user:doc,
        //         layout:false
        //     })
        // }
        // else{
        //     console.log('err'+err)
        // }
    })

})



module.exports=router;
