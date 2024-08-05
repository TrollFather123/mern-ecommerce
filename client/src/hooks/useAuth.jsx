import { parseCookies } from "nookies";
import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/slice/userSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const cookies = parseCookies();
  const token = cookies?.token;

  const isAuthenticated = token;


  useEffect(() => {
    if(token){
        dispatch(getCurrentUser())
    }
  }, [token]);


  return (
    <AuthContext.Provider value={{isAuthenticated,  user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

