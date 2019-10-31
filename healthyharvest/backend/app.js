const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const alarmroutes=require('./routes/alarms.js');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/agriculture',{ useNewUrlParser: true ,useUnifiedTopology: true }, function (err,db) {
 
   if (err) throw err;
   var db=mongoose.connection;
   db.createCollection("alarmmodel", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    
  });
 
   console.log('Successfully connected');
 
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use((req,res,next)=>
// {
//     res.header("Access-Control-Allow-Origin",'*');
//     res.header("Access-Control-Allow-Headers",'*');
//     if(req.method=='OPTIIONS'){
//         res.header("Access-Control-Allow-Methods",'PUT,POST,PATCH,DELETE,GET')
//         return res.status(200).json({});
//     }
// });


app.use('/alarms',alarmroutes);

app.use((req,res,next)=>
{
    const error=new Error('not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>
    {
        res.status(error.status||500);
        res.json(
            {
                error:{
                    message:error.message
                }
            }
        )

    });


module.exports=app      