import React, { useState } from 'react'
//import Tenderdashboard from './Tenderdashboard'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import Header from './Header';

export default function Createtender() 
{
const[categorylist,setCategorylist]=useState([]);
const[tendername,setTendername]=useState();
const[bidstardate,setBidstartdate]=useState();  
const[bidclosedate,setBidclosedate]=useState();   
const[description,setDescription]=useState();
const [categoryId,setCategoryid]=useState();
const TenderCompanyid = sessionStorage.getItem('username');
sessionStorage.setItem('categoryid',categoryId);
sessionStorage.setItem('startdate', bidstardate);
sessionStorage.setItem('closedate', bidclosedate);


  function GetCategory()
{
  axios
  .get("http://localhost:8080/Getcategory")
  .then((res)=>{
    setCategorylist(res.data);
  })
  .catch((error)=>{
    console.log(error); 
  })
}


useEffect(()=>{
  GetCategory();
},[]) 


function handleCreateTender(e)
{
  e.preventDefault();
  const obj={tendername,bidstardate,bidclosedate,description,categoryId};
  if (!TenderCompanyid) {
    toast.error("Tender company ID is missing.");
    return;
  }
  if(!categoryId)
    {
      toast.error("enter categoryId");
      return;
    }
  if(!tendername)
    {
      toast.error("enter tendername");
      return;
    }
      if(!bidstardate)
        {
          toast.error("enter bidstardate");
          return;
        }
        if(!bidclosedate)
          {
            toast.error("enter bidclosedate");
            return;
          }
          if(!description)
            {
              toast.error("enter description");
              return;
            }
        
  axios
  .post(`http://localhost:8080/Createtender/${categoryId}/${TenderCompanyid}`,obj)
  .then((res)=>{
    toast.success(res.data)
    clearAll();
  })
  .catch((error)=>{
    console.log(error);
    toast.error("Failed to create tender");     
  })
}

function clearAll()
{
  setTendername("");
  setDescription("");
  setCategoryid("");
  setBidstartdate("");
  setBidclosedate("");
}

  return (
    <>
    <Header/> 
    <div className='container' style={{
    color:"Black",
    height:"100%",
    marginLeft:"30%",
    padding:"4px 10px",
    marginRight:"40%",
    width:"600px",
    }}>
       
      <h1 style={{color:"Blue",fontFamily:"fantasy"}}>Create a new Tender</h1>  
  
    <div>
      <label>Select Category:</label>
      <select className='form-select mb-3' value={categoryId} 
      onChange={(e)=>setCategoryid(e.target.value)}>
        <option value={0}>--Select Category--</option>
        {
          categorylist.map((item,index)=>{
            return(
              <option key={index} value={item.categoryId}>{item.category}</option>
            )
          })
        }
        </select>
    </div>
    <div>
    <label>Enter Tender Name:</label>
    <input type="text" className='form-control  mb-3' value={tendername} onChange={(e)=>setTendername(e.target.value)}/>
    </div>
    <div>
    <label>Bid Start Date:</label>
    <input type="date" className='form-control  mb-3' value={bidstardate} onChange={(e)=>setBidstartdate(e.target.value)}/>
    </div>
    <div>
      <label>Bid Close Date</label>
      <input type="date" className='form-control  mb-3' value={bidclosedate} onChange={(e)=>setBidclosedate(e.target.value)}/>
      </div>
      <div>
    <label>Description:</label>
    <input type="text" className='form-control  mb-3' value={description} onChange={(e)=>setDescription(e.target.value)}/>
    </div>
      
    <div>
    <button className='btn btn-secondary  mx-3' onClick={clearAll}>Cancel</button>
    <button className='btn btn-primary' onClick={handleCreateTender}>Create</button>
    </div>
    </div>
    </>
  )
}
