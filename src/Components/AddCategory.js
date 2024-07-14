import React, { useState } from 'react'
//import Tenderdashboard from './Tenderdashboard'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from './Header';

export default function AddCategory() 
{
    const[category,setCategory]=useState();

    function handleAddCategory(e)
    {
        e.preventDefault();
        const obj={category};
        if(!category)
        {
          toast.error("Enter Category name");
          return;
        }
        axios
        .post("http://localhost:8080/AddCategory",obj)
        .then((res)=>{
            toast.success(res.data);
            clearAll();
        })
    }
    function clearAll()
    {
        setCategory("");
    }

  return (
    <>
    <div style={{
    color:"Black",
    height:"100%",
    marginLeft:"30%",
    padding:"4px 10px", 
   
}}>
    <div>
        <div>
        <Header/>
      <h1 style={{color:"blue", fontFamily:"fantasy"}} >Add New Category</h1>
    </div>
    <div>
    <label>Enter Category:</label>
    <input type="text" className='form-control' value={category} onChange={(e)=>setCategory(e.target.value)}/>
    </div><br></br>
    <div>
        <Link className="btn btn-primary" onClick={handleAddCategory}>Add Category</Link>
    </div>
    </div>
    </div>
    </>
  )
}
