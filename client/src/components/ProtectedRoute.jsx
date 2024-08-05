import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();

console.log(isAuthenticated,"isAuthenticated")
  return (
    <>
    { isAuthenticated ? <Outlet/> : <Navigate to={"/auth/login"} replace/>}
    </>
  )
}

export default ProtectedRoute