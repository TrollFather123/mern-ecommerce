import React, { createContext, useContext, useEffect, useState } from 'react'
import { parseCookies } from 'nookies'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies?.token;

    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
