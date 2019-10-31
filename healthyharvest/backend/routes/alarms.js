const express=require('express');
const router=express.Router();
const Alarm=require('../models/alarmmodelfile');
const mongoose=require('mongoose')



router.get('/', (req, res,next) => {
 Alarm.find()
 .exec()
 .then(docs=>{
     console.log(docs);
     //if(docs.length>=0){
     res.status(200).json(docs);
    //}
    //  else{
    //      res.status(404).json({
    //          message:'no entries found'
    //      })
    //  }

 })
 .catch(err=>{
     console.log(err);
     res.status(500).json({
         error:err
     })
 })

});


router.post('/', (req, res,next) => {
    const alarminstance=new Alarm({
        _id:new mongoose.Types.ObjectId(),
        date:req.body.date,
        time:req.body.time,
        reason:req.body.reason
    });
    alarminstance.save()
    .then(result=>{
        console.log(result);
        res.status(200).json(
            {
                message:'post requests of alarms',
                createdalarm:alarminstance
            }
        );

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(
            {
                error:err
            }
        );
    });
   
  });
  


router.get('/:alarmid', (req, res,next) => {
    const id=req.params.alarmid;
    Alarm.findById(id)
    .exec()
    .then(doc=>{
        console.log("from database",doc);
        if(doc){res.status(200).json(doc);}
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



router.patch('/:alarmid', (req, res,next) => {
       const id=req.params.alarmid;
       const updatealarm={};
       for(const alarmops of req.body){
           updatealarm[alarmops.propName]=alarmops.value;
       }
       Alarm.update({_id:id},{$set:updatealarm})
       .exec()
       .then(result=>{
           console.log(result);
           res.status(200).json(result)
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



router.delete('/:alarmid', (req, res,next) => {
    const id=req.params.alarmid;
    Alarm.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result);

    })
    .catch(err=>{
        console.log(err);
        res.statusCode(500).json(
            {
                error:err
            }
        )
    })
});
  
module.exports=router