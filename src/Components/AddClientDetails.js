import React from 'react'
import Header1 from './Header1'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function AddClientDetails() 
{
    const [clientPersonName,setClientpersonname]=useState();
    const [phoneno,setPhoneno]=useState();
    const [address,setAddress]=useState();
    const [emailid,setEmailid]=useState();
    const Bidderid = sessionStorage.getItem('username');
    

    function handleAddClientDetails(e)
    {
        e.preventDefault();
  if (!Bidderid) {
    toast.error("Bidder ID is missing.");
    return;
  }
  const obj={clientPersonName,phoneno,address,emailid};
  axios
  .post(`http://localhost:8080/AddClientDetails/${Bidderid}`,obj)
  .then((res)=>{
    toast.success(res.data)
    clearAll();
  })
  .catch((error)=>{
    console.log(error);
    toast.error("Failed to Add Client Details");     
  })
    }

    function clearAll()
    {
        setClientpersonname("");
        setPhoneno("");
        setAddress("");
        setEmailid("");
    }

  return (
    <>
    <Header1/>
    <div className='container' style={{
    color:"Black",
    height:"100%",
    marginLeft:"30%",
    padding:"4px 10px",
    marginRight:"40%",
    width:"600px",
    }}>
    <h1 style={{color:"Blue",fontFamily:"fantasy"}}>Add Client Details</h1>

    <div>
        <label>Client Person Name:</label>
        <input type="text" className='form-control  mb-3' value={clientPersonName} onChange={(e)=>setClientpersonname(e.target.value)}/>
    </div>
    <div>
        <label>Phone no:</label>
        <input type="text" className='form-control  mb-3' value={phoneno} onChange={(e)=>setPhoneno(e.target.value)}/>
    </div>
    <div><label>Address:</label>
    <input type="text" className='form-control  mb-3' value={address} onChange={(e)=>setAddress(e.target.value)}/>
    </div>
    <div>
        <label>Email-id:</label>
        <input type="text" className='form-control  mb-3' value={emailid} onChange={(e)=>setEmailid(e.target.value)}/>
    </div>
    <div>
    <button className='btn btn-secondary  mx-3' onClick={clearAll}>Cancel</button>
    <button className='btn btn-primary' onClick={handleAddClientDetails}>Add Client</button>
    </div>
    </div>
    </>
  )
}
