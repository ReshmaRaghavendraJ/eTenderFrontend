import { useState } from 'react';
import Header2 from './Header2'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';


export default function Post() 
{
    const pid=sessionStorage.getItem('projno');
    const [feedback, setFeedback] = useState();
    const[feedbackDate,setFeedbackDate]=useState();

     function PostComments(e)
    {
        e.preventDefault();
       const obj={feedback,feedbackDate};
       if(!feedback)
       {
        toast.error("Enter Feedback");
        return;
       }
     axios
     .post(`http://localhost:8080/PostComments/${pid}`,obj)
     .then((res)=>{
      toast.success(res.data);  
      //debugger;
     })
     .catch((error) => {
      if (error.response && error.response.status === 409) {
        toast.error("Comments already posted for this project.");
    } else {
        toast.error("Comments not posted...");
    }
    console.log(error);
    });   
    }

    function PostCurrentDate()
    {
        axios
        .post("http://localhost:8080/postCurrentdate")
        .then((res)=>{ 
            setFeedbackDate(res.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    
    function clearAll()
    {
        setFeedback();
        setFeedbackDate();
    }
  return (
    <>
    <div className='container bg-light p-4' style={{
        color:"Black",
        height:"100%",
        marginLeft:"30%",
        padding:"4px 10px",
        marginRight:"40%",
        width:"700px"
        }}>
        <Header2/>
      <h1 className='text-center' style={{color:"Blue",fontFamily:"fantasy"}}>Post Comments</h1>
      <div>
        <label>Feedback:</label>
        <input type="text" className='form-control mb-3' value={feedback} onChange={(e)=>setFeedback(e.target.value)}/>
      </div>
      <div>
      <Link to='/ViewClientProjects' className='btn btn-secondary mx-3'>Back</Link>
        <button className='btn btn-primary mx-3' 
        onClick={(e) => { PostComments(e); PostCurrentDate(); }}>Submit</button>
        <button className='btn btn-secondary' onClick={clearAll}>Cancel</button>
      </div>
    </div>
    </>
  )
}
