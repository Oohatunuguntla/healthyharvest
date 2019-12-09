const express=require("express");
const request=require("request");
const app=express();
const exprs_hb=require('express-handlebars');
const morgan=require("morgan");
const bodyparser=require("body-parser");
const pesticideserviceroutes=require('./routes/pesticideserviceroutes');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.static(__dirname+'/views'));
app.engine('handlebars', exprs_hb({defaultlayout:'layout'}));
app.set('view engine','handlebars');
app.use("/pesticideservice",pesticideserviceroutes)
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
})