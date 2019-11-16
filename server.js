const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const farmer = require('./routes/api/farmer');
const agriexp = require('./routes/api/agriexp');
const customer = require('./routes/api/customer');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

    // Passport middleware
    app.use(passport.initialize());

    // Passport Config
    require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/farmer', posts);
app.use('/api/agriexp', posts);
app.use('/api/customer', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`)); 
