import React from 'react'
import Header from './Header' 
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Viewtender()
 {
  const[categoryId,setCategoryid]=useState('');
  const[categorylist,setCategorylist]=useState([]);
  const[tenderlist,setTenderlist]=useState([]);
  const[bidderlist,setBidderlist]=useState([]);
  const[clientlist,setClientlist]=useState([]);
  const[quotationlist,setQuotationlist]=useState([]);
  const[projectlist,setProjectlist]=useState([]);
  const[feedbacklist,setFeedbacklist]=useState([]);
  const [selectedTenderId, setSelectedTenderId]=useState(); //For view Quotation we require tenderid as a parameter
  const[selectedBidderId,setSelectedBidderId]=useState(); //For update the approve of tender

  useEffect(()=>{
    GetCategorylisttodisplaytender();
    GetAlltodisplayTenders();
    GetAlltodisplayBidders();
    GetAlltodisplayClient();
    Gettodisplaytenderquotation();
    GettodisplayProjects();
    GettodisplayFeedback();
  },[])

  function GetCategorylisttodisplaytender()
  {
    axios
      .get("http://localhost:8080/GetCategorylisttodisplaytender")
      .then((res)=>{  
          setCategorylist(res.data);  //this is for drop down list of category id and name
      })
      .catch((error)=>{
          console.log(error);
      });
  }
 

  function GetAlltodisplayTenders()//this function is for displaying Tender list
  {
      axios
      .get("http://localhost:8080/GetAlltodisplayTenders")
      .then((res)=>{  
         setTenderlist(res.data);  //this is for list tender names when i click on category id
        })
      .catch((error)=>{
          console.log(error);
      });
  }

  
  function GetAlltodisplayBidders(tenderid)//this function is for displaying Bidder list
  {
    setSelectedTenderId(tenderid);// Save the selected tender ID
    axios
      .get(`http://localhost:8080/GetAlltodisplayBidders/${tenderid}`)
      .then((res)=>{  
         setBidderlist(res.data); //this is for displaying Bidder details
        })
      .catch((error)=>{
          console.log(error);
        toast.error(error.response.data);
      });
  }


  function GetAlltodisplayClient(bidderid)//this function is for displaying Client list
  {
    setSelectedBidderId(bidderid);
    axios
      .get(`http://localhost:8080/GetAlltodisplayClient/${bidderid}`)
      .then((res)=>{  
          setClientlist(res.data); //this is for displaying Client details
        })
       
      .catch((error)=>{
          console.log(error);
          toast.error(error.response.data);
      });
  }

  function Gettodisplaytenderquotation(bidderid,tenderid)//this function is for displaying Tender Quotation list
  {
    axios
      .get(`http://localhost:8080/Gettodisplaytenderquotation/${bidderid}/${tenderid}`)
      .then((res)=>{  
          setQuotationlist(res.data); //this is for displaying Quotation details
        })
       
      .catch((error)=>{
          console.log(error);
          toast.error(error.response.data);
      });
  }

  function GettodisplayProjects(clientid)//this function is for displaying Project list
  {
    axios
      .get(`http://localhost:8080/GettodisplayProjects/${clientid}`)
      .then((res)=>{  
         setProjectlist(res.data); //this is for displaying Project details
        })
      .catch((error)=>{
          console.log(error);
        toast.error(error.response.data);
      });
  }

  function GettodisplayFeedback(projectno)//this function is for displaying Feedback list
  {
    axios
      .get(`http://localhost:8080/GettodisplayFeedback/${projectno}`)
      .then((res)=>{  
         setFeedbacklist(res.data); //this is for displaying Feedback details
        })
      .catch((error)=>{
          console.log(error);
        toast.error(error.response.data);
      });
  }

  function ApproveTender(tenderid,bidderid)//this function is for approving the tender
  {
    axios
      .put(`http://localhost:8080/ApproveTender/${tenderid}/${bidderid}`)
      .then((res)=>{  
         toast.success(res.data); 
        })
      .catch((error)=>{
          console.log(error);
        toast.error(error.response.data);
      });
  }
  return (
    <>
    <Header/>
    <div className='container bg-light p-4 mb-3' style={{
    color:"Black",
    height:"100%",
    marginLeft:"10%",
    padding:"4px 10px",
    marginRight:"40%",
    width:"1020px",
    }}>
      <h1 style={{color:"Blue",fontFamily:"fantasy"}}>View Tender Details</h1> 
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
        <h3 style={{color:"Blue",fontFamily:"fantasy"}}>List of Tenders:</h3> 
        <table className='table table-striped' style={{width: "900px",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
    <thead>
                <tr>
                    <th>slno</th>
                    <th>TenderId</th>
                    <th>TenderName</th>
                    <th>Bid-Start-Date</th>
                    <th>Bid-Close-Date</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
              {
                tenderlist
                .filter(item=>item.category["categoryId"]==categoryId)
                .map((item,index)=>{
                  return(
                    <tr key={item.tenderid}>
                        <td>{index+1}</td>   
                        <td>{item.tenderid}</td> 
                        <td>{item.tendername}</td>
                        <td>{item.bidstardate}</td>
                        <td>{item.bidclosedate}</td>
                        <td>{item.description}</td>
                        <td>
                        <button className='btn btn-success mb-3' onClick={()=>GetAlltodisplayBidders(item.tenderid)}>View Bidders</button>
                    </td>
                        </tr>
                  )
                })
              }
            </tbody>
        </table>
      </div>
      <div className='col-6'>
        <h3 style={{color:"Blue",fontFamily:"fantasy"}}>List of Bidders:</h3> 
        <table className='table table-striped' style={{width: "900px",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
    <thead>
                <tr>
                    <th>slno</th>
                    <th>Bidderid</th>
                    <th>BidderName</th>
                    <th>Mobile no</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
              {
                bidderlist
                .map((item,index)=>{
                  return(
                    <tr key={item.bidderid}>
                        <td>{index+1}</td>   
                        <td>{item.bidderid}</td>
                        <td>{item.bidderName}</td> 
                        <td>{item.mobileno}</td>
                        <td>{item.address}</td>
                        <td>
                        <button className='btn btn-success mb-3' onClick={()=>GetAlltodisplayClient(item.bidderid)}>View Client</button>
                    </td>
                    <td>
                        <button className='btn btn-success mb-3' onClick={()=>Gettodisplaytenderquotation(item.bidderid,selectedTenderId)}>View Quotation</button>
                    </td>
                        </tr>
                  )
                })
              }
            </tbody>
        </table>
      </div>
      <div className='rowcontainer' style={{display:"flex",columnGap:"130px"}}>
      <div className='col-md-6'>
        <h3 style={{color:"Blue",fontFamily:"fantasy"}}>List of Clients:</h3>  
        <table className='table table-striped' style={{width: "100%",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
    <thead>
                <tr>
                    <th>slno</th>
                    <th>Clientid</th>
                    <th>ClientPersonName</th>
                    <th>Address</th>
                    <th>phoneno</th>
                </tr>
            </thead>
            <tbody>
              {
                clientlist
                .map((item,index)=>{
                  return(
                    <tr key={item.clientid}>
                        <td>{index+1}</td>   
                        <td>{item.clientid}</td>
                        <td>{item.clientPersonName}</td> 
                        <td>{item.address}</td>
                        <td>{item.phoneno}</td>
                        <td>
                        <button className='btn btn-success mb-3' onClick={()=>GettodisplayProjects(item.clientid)}>View Project</button>
                        </td>
                        </tr>
                  )
                })
              }
            </tbody>
        </table>
    </div>
      <div className='col-md-6'>
        <h3 style={{color:"Blue",fontFamily:"fantasy"}}>List of Quotations:</h3> 
        <table className='table table-striped' style={{width: "100px",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
    <thead>
                <tr>
                    <th>slno</th>
                    <th>Tender Quotations</th>
                </tr>
            </thead>
            <tbody>
              {
                quotationlist
                .map((item,index)=>{
                  return(
                    <tr key={index}>
                        <td>{index+1}</td>   
                        <td>{item.tenderQuotation}</td> 
                        <td>
                      <button className='btn btn-success mb-3' onClick={()=>ApproveTender(selectedTenderId,selectedBidderId)}>Approve</button>
                    </td>
                        </tr>
                  )
                })
              }
            </tbody>
        </table>
        </div>
        </div>
        <div className='col-md-6'>
        <h3 style={{color:"Blue",fontFamily:"fantasy"}}>List of Projects:</h3> 
        <table className='table table-striped' style={{width: "100px",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
    <thead>
                <tr>
                    <th>slno</th>
                    <th>Project No</th>
                    <th>Client Project Name</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
              {
                projectlist
                .map((item,index)=>{
                  return(
                    <tr key={index}>
                        <td>{index+1}</td>   
                        <td>{item.projectno}</td> 
                        <td>{item.clientProjectName}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                        <td>
                        <button className='btn btn-success mb-3' onClick={()=>GettodisplayFeedback(item.projectno)} >View Feedback</button>
                        </td>
                        </tr>
                  )
                })
              }
            </tbody>
        </table>
        </div>
        <div className='col-md-6'>
        <h3 style={{color:"Blue",fontFamily:"fantasy"}}>List of Feedback:</h3> 
        <table className='table table-striped' style={{width: "100px",
  bordercollapse:"collapse",textWrap:"nowrap"}}>
    <thead>
                <tr>
                    <th>slno</th>
                    <th>Feedback No</th>
                    <th>Feedback</th>
                    <th>Feedback Date</th>
                </tr>
            </thead>
            <tbody>
              {
                feedbacklist
                .map((item,index)=>{
                  return(
                    <tr key={index}>
                        <td>{index+1}</td>   
                        <td>{item.feedbackno}</td> 
                        <td>{item.feedback}</td>
                        <td>{item.feedbackDate}</td>
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
