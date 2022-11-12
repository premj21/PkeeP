import React, {useState,useEffect, } from 'react';
import Header from './HomePage/Header';
import Create from './HomePage/Create';
import Footer from './HomePage/Footer';
import Notes from './HomePage/Notes';
import { useNavigate } from "react-router-dom";


import "./style.css";
import Err from './UserInfo/Err';


function App({name}) {
  const navigate = useNavigate();  
  const [list, setLists] = useState([]);

  const getNotes = async () => {
    const response = await fetch(` http://localhost:3001/fetchall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token'),
}
    });
    const json = await response.json() 
    setLists(json);
  }

useEffect(()=>{


   var Styles = {
    body: {
       display: '',
		 justifyContent: '',
		 alignItems: '',
		 minHeight: '',
    flexDirection: '',
     backgroundColor: '#2de8c5'

    }
}
	for(var i  in Styles.body){
        document.body.style[i] = Styles.body[i];
    }
  if(localStorage.getItem('auth-token')) {
    getNotes();
  }
  else{
    navigate('/');
    <Err/> 
  } 
},[navigate]);
  return (
  <>
  
      <Header/>
          <Create setLists={setLists}  name = {name} />
        <div className ='hemlo'> <Notes list = {list} setLists={setLists} /></div>
        <Footer/>
      </>
  );
}
export default App;