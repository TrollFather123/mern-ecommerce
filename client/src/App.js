import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box, styled } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled(Box)`
  /* min-height: calc(100vh - 133px); */
  padding-top: 69px;
`;

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  );
}

export default App;
