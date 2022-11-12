import React,{useState}from 'react';
import SignIn from './SignIn';
import App from '../App';
import Register from './Register';
import {
  Route,Routes
} from "react-router-dom";
import Err from './Err';

function Show() {
  const [name , setName ] = useState('');
    return (
        <div>
    <Routes> 
     <Route  exact path = '/SignIn' element={<SignIn setName= {setName} name = {name}/>}></Route>
      <Route exact path = '/' element={<Register/>}> </Route>
      <Route exact path = '/home' element={<App name = {name}/>}></Route> 
      <Route path = '*' element={<Err/>}></Route>
    </Routes>
        </div>
    );
}

export default Show;