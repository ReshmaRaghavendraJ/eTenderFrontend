import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TenderRegistration()
 {
  const[fname,setfname]=useState("");
  const[email,setemail]=useState("");
  const[phoneno,setphoneno]=useState("");
  const[address,setaddress]=useState("");
  const[password,setpassword]=useState("");
  const usertype=["Tender","Bidder"];
  const[user,setUser]=useState("");

  function handleRegister(e)
  {
    e.preventDefault();
    if(user==='')
      {
        toast.error("Choose user type");  
      }
      else if(user==='Tender')
      {
    const obj={fname,email,phoneno,address,password};
    if(!fname)
    {
      toast.error("enter fname");
      return;
    }
    if (!email || email.length < 3 || email.length > 7) 
      {
      toast.error("Enter an email with a length between 3 and 7 characters");
      return;
    }
    if (!phoneno || phoneno.length < 10 || phoneno.length > 10) 
    {
      toast.error("Enter an phoneno with a exact 10 digits");
      return;
    }
    if (!address) {
      toast.error("Enter address");
      return;
    }
    if (!password || password.length > 4 || password.length < 15)
    {
      toast.error("Enter an password");
      return;
    }
  
    axios
    .post("http://localhost:8080/TenderRegister",obj)
    .then((res)=>{
      toast.success(res.data);
      clearAll();
    })
  } 
    else if(user==='Bidder')
      {
    const obj={bidderName:fname,emailid:email,mobileno:phoneno,address,password};
    if(!fname)
      {
        toast.error("enter fname");
        return;
      }
      if (!email || email.length < 3 || email.length > 7) 
        {
        toast.error("Enter an email with a length between 3 and 7 characters");
        return;
      }
      if (!phoneno || phoneno.length < 10 || email.length > 10) {
        toast.error("Enter an phoneno with a exact 10 digits");
        return;
      }
      if (!password || password.length > 4 || password.length < 15) {
        toast.error("Enter an password");
        return;
      }
      if (!email || email.length < 3 || email.length > 7) {
        toast.error("Enter an email with a length between 3 and 7 characters");
        return;
      }
    axios
    .post("http://localhost:8080/BidderRegister",obj)
    .then((res)=>{
      toast.success(res.data);
      clearAll();
    })
    }
  }

  function clearAll()
  {
    setfname("")
    setemail("")
    setphoneno("")
    setaddress("")
    setpassword("")
    setUser("")
  }

  return (
    <>
    <div className='container'>
      <h1 style={{color:"blue", fontFamily:"fantasy"}}>Registration</h1>
      <div>
        <label>Select for Registration:</label>
        <select className='form-select mb-3' value={user} onChange={(e)=>setUser(e.target.value)}>
        <option value={0}>--Select--</option>
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
        <label>Enter First Name:</label>
        <input type='text' className='form-control mb-3' value={fname} onChange={(e)=>setfname(e.target.value)}/>
        </div>
        <div>
        <label>Enter Email:</label>
        <input type='text' className='form-control mb-3' value={email} onChange={(e)=>setemail(e.target.value)}/>
        </div>
      <div>
      <label>Enter Phoneno:</label>
      <input type='text' className='form-control mb-3' value={phoneno} onChange={(e)=>setphoneno(e.target.value)}/>
      </div>
        <div>
        <label>Enter Address:</label>
        <input type='text' className='form-control mb-3' value={address} onChange={(e)=>setaddress(e.target.value)}/>
        </div>
       <div>
       <label>Enter Password:</label>
       <input type='password' className='form-control mb-3' value={password} onChange={(e)=>setpassword(e.target.value)}/>
       </div>
       <div>
       <Link to='/' className='btn btn-secondary mx-3'>Home</Link>
       <Link className='btn btn-primary mx-3' onClick={handleRegister}>Register</Link>
       <Link className='btn btn-secondary' onClick={clearAll}>Cancel</Link>
       </div>
    </div>
    </>
  )
}
