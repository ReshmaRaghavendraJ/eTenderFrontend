import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';


export default function App() 
{
    const [dateTime, setDateTime] = useState({
      date: '',
      day: '',
      time: '',
    });
    useEffect(() => {
      const updateDateTime = () => {
        const now = new Date();
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[now.getDay()];
        
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
  
        setDateTime({
          date,
          day,
          time,
        });
      };
      updateDateTime();
    
      const interval = setInterval(updateDateTime, 1000);
  
      return () => clearInterval(interval);
    }, []);

  return ( 
    <>
   <div className='container' 
   style={{width:"100%",height:"520px",margin:"20px"}}>
    <div class="logo">
    <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Flag_of_Karnataka%2C_India.svg' alt="" style={{width:"150px"}}/>
    <h1 style={{color:"Red",fontFamily:"fantasy"}}>KARNATAKA TENDERS</h1>
   </div>
   <div style={{textAlign:"left"}}>
      <Link to="Tender Register" className='btn btn-primary mx-3'>Registration</Link>
      <Link to="Login" className='btn btn-primary mx-3' >Login</Link>
      <Link to="Contact" className='btn btn-primary mx-3' >Contact</Link>
      <Link to="About" className='btn btn-primary mx-3' >About</Link>
      <input className='search-bar'
        type="text"
        placeholder="Search..."
      />
      </div>
      <div>
        <b>
      <p style={{textAlign:"right"}}>{dateTime.date},{dateTime.day},{dateTime.time}</p>
      </b>
      </div>
      <div className='slider'>
    <div className='Slider_image'> 
    <img className='slide-img' src="https://blog.tatanexarc.com/wp-content/uploads/2024/01/steel-billets.webp" alt=""/>   
             
    <img className='slide-img'src="https://i.pinimg.com/originals/92/18/fe/9218fe2fbaf5d9aec99d9813d0ed1fbf.jpg" alt=""/>
    <img className='slide-img'src="https://www.gibb.co.za/wp-content/uploads/2018/09/Metolong-Dam.jpg" alt=""/>
    <img className='slide-img' src="https://i.pinimg.com/736x/94/41/f2/9441f2efd20b16f02e73b25b43181a8c.jpg" alt=""/>
    <img className='slide-img' src="https://swadesi.org/wp-content/uploads/2022/11/Basket-Weaving.jpg" alt=""/>
    <img className='slide-img' src="https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2024/06/NTPC-REL-Tenders-BoS-Package-of-1-GW-Wind-Project-in-Karnataka.jpg" alt=""/>
    <img className='slide-img' src="https://images.jdmagicbox.com/quickquotes/images_main/particle-board-furniture-2033580766-50fwwx7o.jpg" alt=""/>
    </div>
    
    </div>

</div>
    </> 
  )
}

