import React from 'react'
import { Outlet } from 'react-router-dom'
import Header1 from './Header1'

export default function Bidderdashboard() {
  return (
    <div className='container'>
      <h1 className='text-center'>Bidder Dashboard</h1>
      <Header1/>
      <Outlet/>
    </div>
  )
}
