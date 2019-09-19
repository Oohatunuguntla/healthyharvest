
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});




app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});





app.post('/signup', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("healthyharvest");
  
  var insertuser={firstName:`${req.body.fname}`,
                  lastName: `${req.body.lname}`,
                  mobilenumber:`${req.body.mobilenumber}`,
                  email:`${req.body.email}`,
                  street:`${req.body.street}`,
                  city:`${req.body.city}`,
                  state:`${req.body.state}`,
                  pincode:`${req.body.pincode}`,
                  type:`${req.body.type}`,

}
  if (`${req.body.type}`=='agricultureexpert')
  {
    var insertagricultureexpert={
      qualification:`${req.body.qualification}`,
      qualificationcertificate:`${req.body.qualificationcertificate}`
    }
    dbo.collection("agricultureexpert").insertOne(insertagricultureexpert,function(err,res){
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    })
  }
  dbo.collection("user").insertOne(insertuser, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}); 
   
      res.sendFile(__dirname + "/frontend/login.html");
    
  });




  app.post('/login', (req, res) => {
    console.log('hospital-building')
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var result1
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("healthyharvest");
    var query = {firstName:`${req.body.fname}`,lastName: `${req.body.lname}`};
    dbo.collection("user").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      result1=result[0]
      db.close();
    });
  });
  jwt.sign({result1}, 'secretkey', (err, token) => {
    // res.json({
    //   token
    // });
    if (result1[type]== "farmer"){
      res.sendFile(__dirname + "/frontend/farmer.html");
    }
    if (result1[type]== "agricultureexpert"){
      res.sendFile(__dirname + "/frontend/agricultureexpert.html");
    }
    if (result1[type]== "customer"){
      res.sendFile(__dirname + "/frontend/customer.html");
    }
    
  });
});



// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token



function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));

