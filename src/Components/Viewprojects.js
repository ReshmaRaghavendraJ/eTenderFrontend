import React, { useEffect } from 'react'
import Header1 from './Header1'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Viewprojects()
 {
  const[clientid,setClientid]=useState("");
  const[clientidlist,setClientidlist]=useState([]);
  const[projectslist,setProjectslist]=useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const Bidderid = sessionStorage.getItem('username');
  

    function GetAllProjects()
    {
        axios
        .get("http://localhost:8080/GetAllProjects")
        .then((res)=>{
         // debugger  
            setProjectslist(res.data);
        })
        .catch((error)=>{
            console.log(error);
        });
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
    GetAllProjects();
  },[])

  function handlestatus(projectno)
  {
     axios
     .put(`http://localhost:8080/StatusCompleted/${projectno}`)
     .then((res)=>{
      if (res.data === "Project is already completed") {
        toast.info(res.data); // Display alert message
      }
      else
      {
      toast.success(res.data);  
      setCompletedProjects([...completedProjects, projectno]);
      GetAllProjects();
     }
    })
     .catch((error) => {
      toast.error("Error updating status");
      console.log(error);
    });
  }
  return (
    <>
    <div className='container bg-light p-4' style={{
    color:"Black",
    height:"100%",
    marginLeft:"30%",
    padding:"4px 10px",
    marginRight:"40%",
    width:"600px"
    }}>
      <Header1/>
      <h1 className='Text-center' style={{color:"Blue",fontFamily:"fantasy"}}>List of Projects</h1>
      

      <div className='col-6'>
      <label>Select Client id and Person Name:</label>
      <select className='form-select mb-3' value={clientid} onChange={(e)=>setClientid(e.target.value)}>
      <option>--Select Client & Person Name--</option>
      {
        clientidlist.filter(client=>client.bidderregistration.bidderid==Bidderid).map((client)=>(
          <option key={client.clientid} value={client.clientid}>{client.clientid}-{client.clientPersonName}</option>
        ))
      }
      </select>   
      </div>
      <div className='col-6'>
       <label>List of Projects:</label>
         <table className='table table-striped' style={{width: "100%",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
            <thead>
                <tr>
                    <th>slno</th>
                    <th>Client Project Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>            
            {
                  projectslist
                  .filter(item=>item.addclientdetails["clientid"]==clientid)
                    .map((item,index)=>{
                    return(
                            <tr key={index}>
                                <td>{index+1}</td>    
                                <td>{item.clientProjectName}</td>
                                <td>{item.description}</td>
                                <td>
                      {!completedProjects.includes(item.projectno) && item.status !== "Completed" && (
                        <button className='btn btn-primary mb-3' onClick={() => handlestatus(item.projectno)}>Completed</button>
                      )}
                    </td>
                            </tr>
                        )
                    })
                }
               
            </tbody>
         </table>
    </div>    
      </div>
    </>
  )
}
