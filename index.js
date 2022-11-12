const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const app = express(); 
const dotenv = require('dotenv'); 
dotenv.config({path:'./config.env'});
app.use(express.urlencoded()); 
app.use(express.json()); 
app.use(cors()); 
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
  useUnifiedTopology:true
},()=>{
    console.log("mongod connected succesfully");
})
const prt = process.env.PORT || 3001
app.use('',require('./routes/auth.jsx'))
app.use('',require('./routes/notess.jsx'))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}
app.listen(prt,()=>{
    console.log(`started server on ${prt}`); 
})