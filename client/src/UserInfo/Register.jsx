import React from 'react';
import {useState,useEffect,} from 'react';
import axios from 'axios'; 
import './Register.css'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function Register() {

     const navigate = useNavigate();
    const [usr,setusr] = useState({
    name:"",
    email:"",
    password:"",
    Cpassword:""
})

useEffect( ()=>{
	  var Styles = {
    body: {
          display: 'flex',
		 justifyContent: 'center',
		 alignItems: 'center',
		 minHeight: '90vh',
    flexDirection: 'column',
    backgroundColor: '#23242a'
    }
}

	for(var i  in Styles.body){
        document.body.style[i] = Styles.body[i];
    }
},[]);


const chnge = (e) =>{
    const{name,value} = e.target;
       setusr(preValue=>{
        return {
            ...preValue,
            [name] : value
        }
       })
       
  }

   const hellow = async(e)=>{
    if(usr.name && usr.email && usr.password &&(usr.password === usr.Cpassword)){
       await axios.post('http://localhost:3001/register',usr)
       .then (res=> {
        if(res.status ===200){
            swal("Registered Successfully !!", "success")
            navigate('/SignIn'); 
        }
       } );
        setusr({
              name:"",
          email:"",
          password:"",
          Cpassword:""
        });
        
         e.preventDefault();
    }

    else  swal("Error!", " Fill the data  !!", "error");
  }
    return (
       <>


       <div className="box-2">
		<div className='frm'>
			<h2>Register </h2>
			<div className="inputBox-1">
				<input name="name"  required="required" value={usr.name}   onChange={chnge}/>
				<span>Userame</span>
				<i></i>
			</div>
            <div className="inputBox-1">
				<input name="email"  required="required" value={usr.email}   onChange={chnge}/>
				<span>Email</span>
				<i></i>
			</div>

			<div className="inputBox-1">
				<input name="password" required="required"  value = {usr.password} onChange={chnge}/>
				<span>Password</span>
				<i></i>
			</div>

            <div className="inputBox-1">
				<input name="Cpassword" required="required"  value = {usr.Cpassword} onChange={chnge}/>
				<span>Confirm password</span>
				<i></i>
			</div>
            

			<div className="links">
			</div  >
            <div className='op'>
            <button type="submit" onClick={hellow} value="Register">Register</button>
			<button   onClick={()=>  navigate('/SignIn')} >SignIn</button>
            </div>
		</div>
	</div>
       </>
    );
}

export default Register;