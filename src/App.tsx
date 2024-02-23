import { useState } from "react";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./styles/theme";
import Languages from "./components/Languages";
import Landing from "./components/LandingPage/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import Home from "./components/HomePage/Home";

import { useSelector } from "react-redux";

import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [location, setLocation] = useState(window.location.pathname);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
    setLocation(window.location.pathname);
  };

  const [openSignupModal, setOpenSignupModal] = useState(false);
  const handleOpenSignupModal = () => {
    setOpenSignupModal(true);
  };
  const handleCloseSignupModal = () => {
    setOpenSignupModal(false);
    setLocation(window.location.pathname);
  };

  const user = useSelector((state: any) => state.user.user);

  return (
    <ThemeProvider theme={theme}>
      <div className="app relative flex  min-h-[100vh]  flex-col bg-white text-black dark:bg-black dark:text-white  xs:h-[100vh] xs:w-full xs:flex-row">
        <BrowserRouter>
          <Languages />
          {/* {!user && location !== "/password_reset" && (
            <Landing
              openLoginModal={openLoginModal}
              handleOpenLoginModal={handleOpenLoginModal}
              handleCloseLoginModal={handleCloseLoginModal}
              openSignupModal={openSignupModal}
              handleOpenSignupModal={handleOpenSignupModal}
              handleCloseSignupModal={handleCloseSignupModal}
              location={location}
              setLocation={setLocation}
            />
          )} */}
          {/* {location !== "/password_reset" && <Sidebar />} */}
          {user && location !== "/password_reset" && <Sidebar />}
          <Routes>
            <Route
              path="/"
              element={
                <Landing
                  openLoginModal={openLoginModal}
                  handleOpenLoginModal={handleOpenLoginModal}
                  handleCloseLoginModal={handleCloseLoginModal}
                  openSignupModal={openSignupModal}
                  handleOpenSignupModal={handleOpenSignupModal}
                  handleCloseSignupModal={handleCloseSignupModal}
                  location={location}
                  setLocation={setLocation}
                />
              }
            ></Route>
            <Route path="/home" element={<Home />}>
              <Route path="diaries" />
              <Route path="reels" />
            </Route>
            <Route
              path="/password_reset"
              element={<PasswordReset setLocation={setLocation} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  openModal={true}
                  handleCloseModal={handleCloseLoginModal}
                  setLocation={setLocation}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignUp
                  openModal={true}
                  setLocation={setLocation}
                  handleCloseModal={handleCloseSignupModal}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
