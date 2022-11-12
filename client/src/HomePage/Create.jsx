import { useState } from 'react';
import {IoIosAdd} from "react-icons/io"
import swal from 'sweetalert';
const Create = ({setLists,setName,name}) =>{
    const [note,setNote] = useState({
        title:"",
        Discription:"",
    });
    const [extd,setextd] = useState(false);
    function Changes(e) {
        const{name,value} = e.target;
       setNote(preValue=>{
        return {
            ...preValue,
            [name] : value
        }
       })
    }
    function submit() {



        
        if(note.title!=="" && note.Discription!==""){
            const {title , Discription } = note; 
            const crt = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token'),
},
        body: JSON.stringify({title ,Discription })
    };
    fetch(' http://localhost:3001/addnt', crt)
        .then(response => response.json())
        .then(data => setLists(data));






       setNote({
              title:"",
          Discription:""
        });
        }
       else  swal("Error!", " FIll the data Completrel !!", "error");
    
    }
    function extend() {
        setextd(true);
    }
    function closing() {
        setextd(false);
    }
    return (
        <div>
           <div className='abp'>
              { extd?
               <input 
               value= {note.title}
               type="text"
                 name = "title"
                  placeholder='Title...'
                  onChange={Changes}
                  />:null
              }
                <p>
                <textarea value={note.Discription}
                     name="Discription"
                     onClick={extend}
                     onDoubleClick= {closing}
                      placeholder=  {`${name} Take a Note`}
                       onChange={Changes}
                      />
                </p>
               { extd ? <button onClick={submit}>
                    <IoIosAdd size={35} />
                </button> :null}
            </div>
        </div>
    );
}

export default Create;