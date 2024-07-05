import React from 'react'
import Header2 from './Header2'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ViewClientProjects()
 {
  const[projectno,setProjectno]=useState();
    const[projectslist,setProjectslist]=useState([]);
    const cltid=sessionStorage.getItem('username');
    const navigate = useNavigate ();
    sessionStorage.setItem('projno', projectno);

    function GetAllProjects()
    {
        axios
        .get("http://localhost:8080/GetAllProjects")
        .then((res)=>{
         //debugger  
            setProjectslist(res.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        GetAllProjects();
      },[])

      function clearAll()
      {
        setProjectslist([]);
      }

      function handlePostComments(projectno) {
        sessionStorage.setItem('projno', projectno);
        navigate(`/Post`);
      }

  return (
    <>
       <Header2/>
  <div className='container bg-light p-4' style={{
    color:"Black",
    height:"100%",
    marginLeft:"30%",
    padding:"4px 10px",
    marginRight:"40%",
    width:"700px"
    }}>
     
      <h1 className='text-center' style={{color:"Blue",fontFamily:"fantasy"}}>View Client Projects</h1>
      <div className='col-6'>
        <label><b>List of Projects:</b></label>
        <table className='table table-striped' style={{width: "100%",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
        <thead>
                <tr>
                    <th>slno</th>
                    <th>Project No</th>
                    <th>Client Project Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {
                  projectslist
                  .filter(item=>item.addclientdetails["clientid"]==cltid)
                  .filter(item => item.status === "Completed")
                    .map((item,index)=>{
                    return(
                            <tr key={index}>
                                <td>{index+1}</td>    
                                <th>{item.projectno}</th>
                                <td>{item.clientProjectName}</td>
                                <td>{item.description}</td>
                                <button className='btn btn-primary'
                                 onClick={() => handlePostComments(item.projectno)}>Post Comments</button>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </div>
      <Link className='btn btn-secondary' onClick={clearAll}>Cancel</Link>
    </div>
    </>
  )
}
