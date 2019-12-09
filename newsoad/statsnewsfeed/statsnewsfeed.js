const express=require("express");
const app=express();
const exprs_hb=require('express-handlebars');
const morgan=require("morgan");
const bodyparser=require("body-parser");
const newsfeedserviceroutes=require('./routes/newsfeedserviceroutes');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.static(__dirname+'/views'));
app.engine('handlebars', exprs_hb({defaultlayout:'layout'}));
app.set('view engine','handlebars');
app.use("/newsfeedservice",newsfeedserviceroutes)
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
})