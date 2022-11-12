import React from 'react'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
const Header = () => {
   const navigate = useNavigate();
    const logo = <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt = "logo" />


    const chnge = () =>{
      swal("You sure you want to logOut", {
  buttons: {
    Yes: true,
    No:true,
  },
})
.then((value) => {
  switch (value) {
    case "Yes":
      localStorage.removeItem('auth-token'); 
      navigate('/');
      break;
    default:
  }
});


    }
  return ( 
  <> 
<div className='header '>
      
    {logo}
    <h3>PkeeP</h3>

     <div className='gg' >
       <button   onClick={chnge}>LogOut</button>
       </div>
</div>
  </>
  )
}
export default Header;
