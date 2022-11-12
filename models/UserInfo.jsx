const mongoose = require('mongoose'); 
const userss = mongoose.Schema({
   name:{
    type : String,
    require:true
   },
    email:{
    type : String,
    require:true
   },
    password:{
    type : String,
    require:true
   },
    Cpassword:{
    type : String,
    require:true
   }
});

const UserInfo = new mongoose.model("User",userss); 
module.exports = UserInfo ; 