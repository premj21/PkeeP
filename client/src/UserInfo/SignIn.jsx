import React from 'react';
import { useState ,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './SignIn.css';
import swal from 'sweetalert';

function SignIn({setName}) {
  const navigate = useNavigate();
  const [usr, setusr] = useState({
    email:"",
    password:""
 }); 

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
});
  const chnge = (e) =>{
    const{name,value} = e.target;
       setusr(preValue=>{
        return {
            ...preValue,
            [name] : value
        }
       })
  }
  const hellow = async (e)=>{
  setName(usr.email);
     e.preventDefault();
 const {email, password} = usr;
     if(usr.email!=="" && usr.password!==""){
        const res = await fetch('http://localhost:3001/login',{
          method: "POST",
          headers : {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,
            password
          })
        });
        const dat = await res.json();
        if(dat.success) {
          swal("Good Job!", "Login Successfully !!", "success", {
           buttons: {  
    Okay: true
  },
   
  })
.then((value) => {
  switch (value) {
     default:
     localStorage.setItem('auth-token',dat.token);
      navigate('/home'); 
    }
    
    
  }) 
      }
        else{
           swal("Error!", "INVALID CREDENTISL !!", "error");
          }
     }
     else{
       swal("Error!", " FIll the data Completely !!", "error");
     }
  }
    return (
        <>
       <div className="box-1">
		 <div className='frm'>
			<h2>Sign in</h2>
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
			<div className="links-1">
			</div>
		
       <div className='op'>
            <button type="submit" onClick={hellow} value="Login">Login</button>
			<button  className='ml-2' onClick={()=>  navigate('/')} >Register</button>
            </div>
		</div>
	</div>       
        </>
    );
}

export default SignIn;