import React from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {faPlus,faSignOutAlt}from '@fortawesome/free-solid-svg-icons';

export default function Header2() {
  return (
<> 
 <div class="sidebar">  
 <div class="logo">
  <img src='etender.png' alt=""/>
 </div>
 <Link to="/ViewClientProjects" className='a'><FontAwesomeIcon icon={faPlus} />View Client Projects</Link><br></br>
 <Link to='/' className='a'><FontAwesomeIcon icon={faSignOutAlt}/>Logout</Link>
</div> 
 </>
  )
}
