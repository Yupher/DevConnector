const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')
const path = require('path')

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

const app = express();
app.use(cors())
app.options('*', cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false,useCreateIndex: true,})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);

//serve static assets if in production 
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
