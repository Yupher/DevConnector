const express = require('express');
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const post = require('./routes/api/post')
app = express()

mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology:  true})
  .then(()=>console.log('mongodb connected'))
  .catch(e=> console.log(e))

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/post', post)

const PORT = process.env.PORT || '5000'

app.listen(PORT, (err)=>{
  if(err) throw err
  console.log(`server started at ${PORT}`)
})