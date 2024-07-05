import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import TenderDashboard from './Tenderdashboard';
import Header from './Header';

export default function Categorylist() 
{
    const[categorylist,setCategorylist]=useState([]);
    function GetCategorylist()
    {
        axios
        .get("http://localhost:8080/GetCategorylist")
        .then((res)=>{
            setCategorylist(res.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    useEffect(()=>{
        GetCategorylist();
    },[])
  return (
    <>
            <div className='bg-light p-4'>
                <Header/>
                <h1 style={
                    {
                        color:"Blue",
                        height:"100%",
                        marginLeft:"30%",
                        padding:"4px 10px",
                        fontFamily:"fantasy"
                    }
                }>Category List</h1>
            </div>
            <div className='col-6' style={{marginLeft:"30%"}}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Slno</th>
                            <th>Category</th>
                        </tr>       
                    </thead>
                    <tbody>
                        {
                            categorylist.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.category}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </>
        );
    };
