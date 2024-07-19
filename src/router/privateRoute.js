import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
  return localStorage.getItem('token') ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute
