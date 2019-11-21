const express=require('express');
const router=express();
const Alarm=require('../models/alarmmodelfile');
const mongoose=require('mongoose')
const path=require("path")
router.set('view engine','ejs');

router.get('/:email', (req, res,next) => {
    console.log('gggg');
    Alarm.find({'_userid':req.params.email})
         .exec()
         .then(docs=>{
            console.log(docs);
            res.render('../views/alarms.ejs', { context: docs })
                     })
         .catch(err=>{
                console.log(err);
                 res.status(500).json({error:err})
                     })
});



//set new alarm
router.post('/:email', (req, res,next) => {
    console.log('po')
    const alarminstance=new Alarm({
        _userid:req.params.email,
        _id:new mongoose.Types.ObjectId(),
        date:req.body.date,
        time:req.body.time,
        reason:req.body.reason
    });
     
    alarminstance.save()
    .then(result=>{
        console.log(result);
        // res.status(200).json(
        //     {
        //         message:'post requests of alarms',
        //         createdalarm:alarminstance
        //     }
        // );
        res.redirect('http://localhost:3000/alarms/ooha.t17@iiits.in');

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
                });
    
});



//delete alarm of user
 router.get('/delete/:alarmid', (req, res,next) => {
    console.log('d')
    const id=req.params.alarmid;
    Alarm.remove({_id:id})
    .exec()

    .then(result=>{
        console.log('after deleting');
        res.redirect('http://localhost:3000/alarms/ooha.t17@iiits.in');  
                    })

    .catch(err=>{
        console.log(err);
        res.statusCode(500).json({ error:err })
                })
});




//get alarms of particular id
router.get('/get/:alarmid', (req, res,next) => {
    console.log('ga')
    const id=req.params.alarmid;
    Alarm.findById(id)
    .exec()
    .then(doc=>{
        console.log("from database",doc);
        if(doc){
            res.status(200).json(doc);

        }
        else{
            res.status(404).json({
                message:"no valid entry"
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
   
});


//updtae the alarm
router.post('/update/:alarmid', (req, res,next) => {
       console.log('pa')
       const id=req.params.alarmid;
       console.log(req.body);
       
       Alarm.update({_id:id},{$set:req.body})
       .exec()
       .then(result=>{
           //console.log(result);
           //res.status(200).json(result)
           res.redirect('http://localhost:3000/alarms/ooha.t17@iiits.in');  
       })
       .catch(err=>{
           console.log(errr);
           res.status(500).json(
               {
                   error:err
               }
           )
       })
  });



//render html file of setting new alarm
  router.get("/set/add_new_alarm", (req, res) => {
      console.log('newww')
      res.render('../views/alarm.ejs');
    
  });



  //rendering ejs page for update alarm 
  router.get("/update_alarm/:alarmid", (req, res) => {
    const existalarmid=req.params
    console.log(existalarmid)
    Alarm.findById(existalarmid.alarmid)
    .exec()
    .then(doc=>{
        console.log("from database",doc);
        if(doc){
            //res.status(200).json(doc);
            res.render('../views/alarmupdate.ejs', { context:doc})
        }
        else{
            res.status(404).json({
            message:"no valid entry"
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports=router