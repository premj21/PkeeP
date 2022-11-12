import React ,{useState}from 'react';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import {Modal, ModalBody, ModalHeader,Row,Col} from 'reactstrap';

function Notes({list,setLists}) {
    const [set,setSt] = useState({
        isit:false,
        idd:""
    }); 

    const [stt,setNew] = useState({
        title:"",
        Discription:""
    })



    const tp = (e)=>{
       const{name,value} = e.target;
       setNew(preValue=>{
        return {
            ...preValue,
            [name] : value
        }
       })
    }

    const del = async(id) =>{
          const crt = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token'),
},
        body: JSON.stringify({id})
    };
    fetch('http://localhost:3001/delete', crt)
        .then(response => response.json())
        .then(data => setLists(data));
    }

    const chnge = async(id)=>{
      setSt({isit:false});
 const {title ,Discription } = stt;
         const crt = {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token'),
},
        body: JSON.stringify({title:title,Discription:Discription,id:id})
    };
    fetch(' http://localhost:3001/editnote', crt)
        .then(response => response.json())
        .then(data => setLists(data));
        setNew({
             title:"",
          Discription:""
        })
    }
    return (
       
  <>



 <Modal size='lg-7' isOpen={set.isit}  toggle={()=>setSt(!set.isit)}>
    <ModalHeader>
     Edit_NOte
    </ModalHeader>
    <ModalBody>
            <Row>
                <Col lg={5}>
                <div>
                    <label htmlFor='title'> Title</label>
                    <input name="title"  required="required" value={stt.name}   onChange={tp}className='form-control'
                    placeholder='Title'/>
                </div>

                </Col>

                 <Col lg={5}>
                <div>
                    <label htmlFor='Discription'>Discription</label>
                    <input name="Discription"  required="required" value={stt.Discription}   onChange={tp}className='form-control'
                    placeholder='Description'/>
                </div>
                </Col>
            </Row>
            <br />
             <button className='btn ' style={ {backgroundColor:'black',color:'white'} } onClick = {()=> chnge(set.idd)} >
                 Update
                </button>
    </ModalBody>
 </Modal>



  {
  list.map(User =>(
 <div className='note' key = {User._id}> 
    <h1>{User.title}</h1>
        <p readOnly>{User.Discription}</p> 
        <button onClick={()=> del(User._id)}>
            <MdDelete size= {23}/>
            </button>
             <button onClick={()=>setSt({isit: true, idd: User._id})} >
            <FiEdit size= {23}/>
            </button>
 </div>
            ))
            }
            </>
    );
}

export default Notes;