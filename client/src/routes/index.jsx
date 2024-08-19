import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import AuthGuard from "../components/AuthGuard";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import AddToCart from "../pages/AddToCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <AuthGuard>
            <Home />
           </AuthGuard>
        ),
      },
      {
        path: "about",
        element: (
          <AuthGuard>
            <About />
           </AuthGuard>
        ),
      },
      {
        path: "add-to-cart",
        element: (
          <AuthGuard>
            <AddToCart />
           </AuthGuard>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AuthGuard>
            <Dashboard />
           </AuthGuard>
        ),
        children:[
          {
            path:"all-users",
            element:<AllUsers/>
          },
          {
            path:"products",
            element:<AllProducts/>
          },
        ]
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/signup",
        element: <SignUp />,
      },
      {
        path: "auth/verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path:"auth/forgot-password/:id",
        element:<ForgotPassword/>
      }
    ],
  },
]);

export default router;
