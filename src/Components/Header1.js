import React from 'react';
 import './styles.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faPlus,faFileAlt,faHandshake} from '@fortawesome/free-solid-svg-icons';

export default function Header1()
{
  return (
    <> 
 <div class="sidebar">  
 <div class="logo">
  <img src='etender.png' alt=""/>
 </div>
 <Link to="/AddClientDetails" className='a'><FontAwesomeIcon icon={faPlus} />Add Client Details</Link><br></br>
 <Link to="/AddClientProjectWork" className='a'><FontAwesomeIcon icon={faPlus} />Add Client Projectwork Details</Link><br></br>
 <Link to="/Viewprojects" className='a'><FontAwesomeIcon icon={faFileAlt} />View Projects</Link><br></br>
 <Link to="/ApplyTender" className='a'><FontAwesomeIcon icon={faHandshake} />Apply Tenders</Link>
 <Link to='/' className='a'><FontAwesomeIcon icon={faSignOutAlt}/>Logout</Link>
</div> 
</>
  )
}
