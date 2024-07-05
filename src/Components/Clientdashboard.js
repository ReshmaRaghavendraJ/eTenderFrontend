import React from 'react'
import Header2 from './Header2'
import { Outlet } from 'react-router-dom'

export default function Clientdashboard() {
  return (
    <div className='container'>
      <h1 className='text-center'>Client Dashboard</h1>
      <Header2 />
      <Outlet />
    </div>
  )
}
