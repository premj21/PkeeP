const express = require('express'); 
const router = express.Router();
const UserInfo = require('../models/UserInfo.jsx');
const bcrypt = require('bcrypt'); 
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); 
dotenv.config({path:'../config.env'});

const fetchuser = require('../Userathenticate/fetchuser.jsx');
const jw_sec = process.env.JW_SEC;

router.post("/register",  (req, res)=> {
    const { name, email, password} = req.body
    UserInfo.findOne({email: email}, async(err, user) => {
        if(user){
            res.send({message: "User already Exist"})
        } else {
          const salt = await bcrypt.genSalt(12); 
          const ggpass = await bcrypt.hash(password,salt);
            const user = new UserInfo({
                name,
                email,
                password:ggpass,
                Cpassword:ggpass
            })

           await user.save(err => {
                if(!err) {
                    const data = {
                user:{
                    id:user._id
                }
            }
            const token = jwt.sign(data,jw_sec);
                    res.json({token});
                res.status(200).send("sucsess")
                }
            })
        }
    })
}) ;
router.post('/login', (req,res)=>{
     const {email,password} = req.body;
     let success = false; 
    UserInfo.findOne({email:email}, async(err,user) =>{
        if(user) {
           const sure = await bcrypt.compare(password,user.password);
           if(sure) 
           {
            const data = {
                user:{
                    id:user._id
                }
            }
            const token = jwt.sign(data,jw_sec);
            success = true; 
          res.status(200).json({success,token}); 
        }
        else{

            return res.status(404).send({success}); 
        }
        }
        else{
           return  res.status(404).send({success}); 
        }
    })
});


module.exports = router