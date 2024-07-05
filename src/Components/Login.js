import axios from 'axios';
import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { Link } from 'react-router-dom';

export default function Login() 
{
 const[userid,setUserid]=useState();
 const[password,setPassword]=useState();
 const[user,setUser]=useState();
 const[getdata,setGetData]=useState();
 const usertype=["Tender","Bidder","Client"];
 const navigate = useNavigate ();


function handleLogin(e)
{
  e.preventDefault();

  if(user==='')
    {
      toast.error("Choose user type");
    }
    else if(user==="Tender")
    {
  axios
  .get(`http://localhost:8080/tlogin/${userid}/${password}`)
  .then((res)=>{
    setGetData(res.data);
    clearAll();
    toast.success("Tender Login successful");
    navigate("/Tenderdashboard");
    sessionStorage.setItem('username', userid);
  })
    .catch((error)=>{
      toast.error(error.response.data);
    });
  }
  else if(user==="Bidder")
    {
    axios
    .get(`http://localhost:8080/blogin/${userid}/${password}`)
    .then((res)=>{
      setGetData(res.data);
      clearAll();
      toast.success("Bidder Login successful");
      navigate("/Bidderdashboard");
      sessionStorage.setItem('username', userid);
    })
      .catch((error)=>{
        toast.error(error.response.data);
      });
    }
      else if(user==="Client")
        {
      axios
    .get(`http://localhost:8080/clogin/${userid}/${password}`)
    .then((res)=>{
      setGetData(res.data);
      clearAll();
      toast.success("Client Login successful");
      navigate("/Clientdashboard");
      sessionStorage.setItem('username', userid);
    })
      .catch((error)=>{
        toast.error(error.response.data);
      });
        }
      else
      {
        alert("Invalid User Type...");
      }  
    }

  function clearAll()
  {
    setPassword("")
    setUserid("")
    setUser("")
    setGetData("")
  }
 
  return (
    <div>
      <h1>Login Form</h1>
      <div>
      <select className='form-select mb-3' value={user} onChange={(e)=>setUser(e.target.value)}>
        <option value={0}>--Select User Type--</option>
        {
          usertype.map((item,index)=>{
            return(
              <option key={index} value={item}>{item}</option>
            )
          })
        }
      </select>
      </div>
      <div>
        <label>Enter User id:</label>
        <input type='text' className='form-control mb-3' value={userid} onChange={(e)=>setUserid(e.target.value)}/>
      </div>
      <div>
        <label>Enter Password:</label>
        <input type='password' className='form-control mb-3' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <Link to='/' className='btn btn-secondary mx-3'>Home</Link>
      <button className='btn btn-primary' onClick={handleLogin}>Login</button>
      <button className='btn btn-secondary mx-3' onClick={clearAll}>Clear</button>
  <p>{getdata}</p>
    </div>
  )
}
