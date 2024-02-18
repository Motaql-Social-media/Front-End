
import {  useState } from "react";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./styles/theme";
import Languages from "./components/Languages";
import Landing from "./components/LandingPage/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasswordReset from "./components/PasswordReset/PasswordReset";

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

  return (
    <ThemeProvider theme={theme}>
      <div className="app relative flex  min-h-[100vh]  flex-col-reverse bg-white text-black dark:bg-black dark:text-white  xs:h-[100vh] xs:w-full xs:flex-row">
        <BrowserRouter>
          <Languages />

          {location !== "/password_reset" && (
            <Landing
              openLoginModal={openLoginModal}
              handleOpenLoginModal={handleOpenLoginModal}
              handleCloseLoginModal={handleCloseLoginModal}
              openSignupModal={false}
              handleOpenSignupModal={() => {}}
              handleCloseSignupModal={() => {}}
              location={location}
              setLocation={setLocation}
            />
          )}
          <Routes>
            <Route path="/password_reset" element={<PasswordReset setLocation={setLocation}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
