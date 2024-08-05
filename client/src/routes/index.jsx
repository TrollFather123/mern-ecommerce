import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import AuthGuard from "../components/AuthGuard";
import About from "../pages/About";

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
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
