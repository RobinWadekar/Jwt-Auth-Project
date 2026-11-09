import React, { useActionState, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import RegisterEmployee from './RegisterEmployee'
import CeoPage from './CeoPage'
import HrPage from './HrPage'
import ManagerPage from './ManagerPage'
import EmpPage from './EmpPage'
import Home from './Home'

const EndpointsList = () => {
  return (
    <div>
      {/* <RegisterEmployee />
          <CeoPage />
          <HrPage />
          <ManagerPage />
          <EmpPage /> */}
      <h4>Endpoints</h4>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/empPage'>EmpPage</Link></li>
        <li><Link to='/managerPage'>ManagerPage</Link></li>
        <li><Link to='/hrPage'>HrPage</Link></li>
        <li><Link to='/ceoPage'>CeoPage</Link></li>
      </ul>
    </div>
  )
}

export default EndpointsList
