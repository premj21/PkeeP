const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const keeper = mongoose.Schema({
   user:{
    type:Schema.Types.ObjectId,
    ref: "User" 
   },
    title:{
       type:String,
       required:true
    },
    Discription:
    {
     type:String,
     required:true
    }
});
const UserNotes = new mongoose.model("Notes",keeper);  
module.exports = UserNotes;