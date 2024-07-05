import React, { useState } from 'react'
import Header1 from './Header1'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function AddClientProjectWork() 
{
const[clientProjectName,setClientProjectName]=useState("");
const[description,setDescription]=useState("");
const[clientid,setClientid]=useState("");
const[clientidlist,setClientidlist]=useState([]);
const Bidderid = sessionStorage.getItem('username');


function handleAddClientProjectworkDetails(e)
{
e.preventDefault();
if (!clientid) {
  toast.error("Client ID is missing.");
  return;
}
const obj={clientid,clientProjectName,description};
axios
  .post(`http://localhost:8080/AddClientProjectwork/${clientid}`,obj)
  .then((res)=>{
    toast.success(res.data)
    clearAll();
  })
  .catch((error)=>{
    console.log(error);
    toast.error("Failed to Add Client Projectwork Details");     
  })
  }

  function GetClientidName()
  {
    axios
  .get("http://localhost:8080/GetClientidName")
  .then((res)=>{
    setClientidlist(res.data);
  })
  .catch((error)=>{
    console.log(error); 
  })
  }
useEffect(()=>{
  GetClientidName();
},[]) 


function clearAll()
{
setClientProjectName("");
setDescription("");
setClientid("");
setClientidlist([]);
}

  return (
    <>
    <div className='container' style={{color:"Black",
    height:"100%",
    marginLeft:"30%",
    padding:"4px 10px",
    marginRight:"40%",
    width:"600px"
    }}>
      <Header1/>
      <h1 className='text-center' style={{color:"Blue",fontFamily:"fantasy"}}>Add Client Projectwork</h1>
      <div>
        <label>Select Client-id and Person Name:</label>
        <select className='form-select mb-3' value={clientid} 
      onChange={(e)=>setClientid(e.target.value)}>
        <option value={0}>--Select clientid and Person Name--</option>
        {
          clientidlist
          .filter(item=>item.bidderregistration.bidderid==Bidderid)
          .map(item=>(
            <option key={item.clientid} value={item.clientid}>{item.clientid+"-"+item.clientPersonName}</option>
          ))
        }
        </select>
      </div>
      <div>
        <label>ClientProjectName:</label>
        <input type="text" className='form-control mb-3' value={clientProjectName} onChange={(e)=>setClientProjectName(e.target.value)}/>
      </div>
      <div>
        <label>Description:</label>
        <input type="text" className='form-control mb-3' value={description} onChange={(e)=>setDescription(e.target.value)}/>
      </div>
      <div>
    <button className='btn btn-secondary  mx-3' onClick={clearAll}>Cancel</button>
    <button className='btn btn-primary' onClick={handleAddClientProjectworkDetails}>Add Client</button>
    </div>
    </div>
    </>
  )
}
