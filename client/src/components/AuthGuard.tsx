import { parseCookies } from "nookies";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const cookies = parseCookies();
  const token = cookies?.token;

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default AuthGuard;
