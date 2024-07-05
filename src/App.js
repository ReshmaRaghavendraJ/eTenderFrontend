import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import TenderRegistration from './Components/TenderRegistration'
import Login from './Components/Login'
import Tenderdashboard from './Components/Tenderdashboard'
import Bidderdashboard from './Components/Bidderdashboard'
import Clientdashboard from './Components/Clientdashboard'
import Contact from './Components/Contact'
import About from './Components/About'
import Categorylist from './Components/Categorylist'
import AddCategory from './Components/AddCategory'
import Createtender from './Components/Createtender'
import AddClientDetails from './Components/AddClientDetails'
import AddClientProjectWork from './Components/AddClientProjectWork'
import Viewprojects from './Components/Viewprojects' 
import ViewClientProjects from './Components/ViewClientProjects'
import Post from './Components/Post'
import ApplyTender from './Components/ApplyTender'
import ApplyforTender from './Components/ApplyforTender'

export default function App() {
  return (
  <div className='container'>
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="" element={<Dashboard/>}/>
        <Route path="/Tender Register" element={<TenderRegistration/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Tenderdashboard" element={<Tenderdashboard/>}/>
        <Route path="/Categorylist" element={<Categorylist/>}/>
        <Route path="/AddCategory" element={<AddCategory/>}/>
        <Route path="/Createtender" element={<Createtender/>}/> 
        <Route path="/Bidderdashboard" element={<Bidderdashboard/>}/>
        <Route path="/AddClientDetails" element={<AddClientDetails/>}/>
        <Route path="/AddClientProjectWork" element={<AddClientProjectWork/>}/>
        <Route path="/ApplyTender" element={<ApplyTender/>}/>
        <Route path="/ApplyforTender" element={<ApplyforTender/>}/>
        <Route path="/Viewprojects" element={<Viewprojects/>}/>
        <Route path="/Clientdashboard" element={<Clientdashboard/>}/>
        <Route path="/ViewClientProjects" element={<ViewClientProjects/>}/>
        <Route path="/Post" element={<Post/>}/>
        <Route path="/Contact" element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
} 
