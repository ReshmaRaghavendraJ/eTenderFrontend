import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Header1 from './Header1';
import { Link } from 'react-router-dom';

export default function ApplyforTender()
 {
const[tenderQuotation,setTenderQuotation]=useState('');
const tndid=sessionStorage.getItem('tenderid');
const Bidderid=sessionStorage.getItem('username');


 function handleapplytender()
{
    if (!tndid) {
      toast.error("Tender ID is missing.");
      return;
    }
    
  const obj={tenderQuotation};
  axios
  .post(`http://localhost:8080/AddApplyTender/${tndid}/${Bidderid}`,obj)
  .then((res)=>{
   //debugger;
    toast.success(res.data);
    clearAll();
  })
  .catch((error)=>{
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    } else {
      toast.error("Failed to apply tender");
    } 
  })
}

  function clearAll()
{
setTenderQuotation('');
}

  return (
    <>
    <div className='container bg-light p-4' style={{
    color:"Black",
    height:"100%",
    marginLeft:"10%",
    padding:"4px 10px",
    marginRight:"40%",
    width:"1000px"
    }}>  
    <Header1/>
    <h1 className='Text-center mb-3' style={{color:"Blue",fontFamily:"fantasy"}}>Apply For Tender</h1>
    
    <div className='col-6' style={{width: "100%",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
    <label>Enter Tender Quotation Number:</label>
    <input type="text" className='form-control  mb-3' value={tenderQuotation} onChange={(e)=>setTenderQuotation(e.target.value)}/>
    </div>
    <div>
    <Link to='/ApplyTender' className='btn btn-secondary mx-3'>Back</Link>
    <button className='btn btn-primary' onClick={handleapplytender}>Apply for Tender</button>
    <button className='btn btn-secondary  mx-3' onClick={clearAll}>Cancel</button>
    </div>
    </div>
    </>
  )
}
