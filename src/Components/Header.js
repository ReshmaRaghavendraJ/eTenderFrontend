import React from 'react';
 import './styles.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faFileAlt,faSignOutAlt,faPlus} from '@fortawesome/free-solid-svg-icons';

export default function Header()
{
  return (
    <> 
 <div class="sidebar">  
 <div class="logo">
  <img src='etender.png' alt=""/>
 </div>
 <Link to="/Categorylist" className='a'><FontAwesomeIcon icon={faFileAlt}/>Category List</Link><br></br>
 <Link to="/AddCategory" className='a'><FontAwesomeIcon icon={faFolderPlus} />Add Category</Link><br></br>
 <Link to="/Createtender" className='a'><FontAwesomeIcon icon={faPlus} />Create New Tender</Link><br></br>
 <Link to="/Viewtender" className='a'><FontAwesomeIcon icon={faFileAlt} />View Tender</Link><br></br>
 <Link to='/' className='a'><FontAwesomeIcon icon={faSignOutAlt}/>Logout</Link>
</div> 
</>
  )
}
