import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';


export default function TenderDashboard() {
  return (
    <div className='container'>
      <h1 className='text-center'>Tender Dashboard</h1>
      <Header />
      <Outlet />
    </div>
  );
}
