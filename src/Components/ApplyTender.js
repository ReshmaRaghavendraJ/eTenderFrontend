import React, { useState } from 'react'
import Header1 from './Header1'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

export default function ApplyTender() 
{
  const[categoryId,setCategoryid]=useState('');
  const[categorylist,setCategorylist]=useState([]);
  const[tenderlist,setTenderlist]=useState([]);

 const navigate = useNavigate ();

  function GetCategorylisttoapplytender()//this function is for displaying dropdown list 
  {
      axios
      .get("http://localhost:8080/GetCategorylisttoapplytender")
      .then((res)=>{  
          setCategorylist(res.data);  //this is for drop down list of category id and name
      })
      .catch((error)=>{
          console.log(error);
      });
  }

  function GetAllTenders()//this function is for displaying Tender list
  {
      axios
      .get("http://localhost:8080/GetAllTenders")
      .then((res)=>{  
         setTenderlist(res.data);  //this is for list tender names when i click on category id
        })
      .catch((error)=>{
          console.log(error);
      });
  }

  function Getdate(tender) {
    const { bidstardate, bidclosedate, tenderid } = tender;//this function is for checking current date with bidstart date and bidclosedate
      axios
      .get(`http://localhost:8080/Getdate/${bidstardate}/${bidclosedate}`)
      .then((res)=>{  
        if(res.data==="Tender can be applied")
        {
            toast.success(res.data);
            sessionStorage.setItem('tenderid', tenderid);
            navigate("/ApplyforTender");
        }
        else
        {
          toast.error(res.data);
        }
      })

  }

  useEffect(()=>{
    GetCategorylisttoapplytender();
    GetAllTenders();
    // Getdate();
  },[])

  function clearAll()
  {
    setCategoryid();
    setCategorylist([]);
    setTenderlist([]);
  }

  return (
    <>
    <div className='container bg-light p-4 mb-3' style={{
    color:"Black",
    height:"100%",
    marginLeft:"10%",
    padding:"4px 10px",
    marginRight:"40%",
    width:"1000px"
    }}>
      <Header1/>
      <h1 className='Text-center mb-3' style={{color:"Blue",fontFamily:"fantasy"}}>List of Tenders</h1>
      <div className='col-6'>
      <label>Select Category id and Category Name:</label>
      <select className='form-select mb-3' value={categoryId} onChange={(e)=>setCategoryid(e.target.value)}>
      <option>--Select Category id & Category Name--</option>
      {
        categorylist.map((item)=>(
          <option key={item.categoryId} value={item.category.categoryId}>{item.category.categoryId}-{item.category.category}</option>
        ))
      }
      </select>   
      </div>
      <div className='col-6'>
        <label>List of Tenders:</label>
        <table className='table table-striped' style={{width: "100%",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
    <thead>
                <tr>
                    <th>slno</th>
                    <th>Tender Id</th>
                    <th>Tender Name</th>
                    <th>Bid Start Date</th>
                    <th>Bid Close Date</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
              {
                tenderlist
                .filter(item=>item.category["categoryId"]==categoryId)
                .map((item,index)=>{
                  return(
                    <tr key={index}>
                        <td>{index+1}</td>   
                        <td>{item.tenderid}</td> 
                        <td>{item.tendername}</td>
                        <td>{item.bidstardate}</td>
                        <td>{item.bidclosedate}</td>
                        <td>{item.description}</td>
                        <td>
                        <button className='btn btn-success mb-3' onClick={(e)=>Getdate(item)}>Apply Tender</button>
                    </td>
                        </tr>
                  )
                })
              }
            </tbody>
        </table>
      </div>
      <button className='btn btn-secondary mx-3' onClick={clearAll}>Clear</button>
    </div>
    </>
  )
}
