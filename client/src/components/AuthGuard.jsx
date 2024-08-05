import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';


const AuthGuard = ({children}) => {

const {isAuthenticated} = useAuth()


  console.log(isAuthenticated,"isAuthenticated")


  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children
};

export default AuthGuard;
