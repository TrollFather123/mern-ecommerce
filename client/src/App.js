import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Box sx={{ minHeight: "calc(100vh - 133px)" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default App;
