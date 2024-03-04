import { useEffect, useState } from "react"

import ThemeProvider from "@mui/material/styles/ThemeProvider"
import theme from "./styles/theme"
import Languages from "./components/Languages"
import Landing from "./components/LandingPage/Landing"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PasswordReset from "./components/PasswordReset/PasswordReset"
import Login from "./components/Login/Login"
import SignUp from "./components/Signup/Signup"
import Home from "./components/HomePage/Home"
import { useRef } from "react"

import { useSelector } from "react-redux"

import Sidebar from "./components/Sidebar/Sidebar"
import Diaries from "./components/HomePage/Posts/Diaries"
import Reels from "./components/HomePage/Posts/Reels"
import useCheckMobileScreen from "./components/hooks/useCheckMobileScreen"
import Bookmarks from "./components/Bookmarks/Bookmarks"
import PostEngagement from "./components/PostEngagement/PostEngagement"
import Reposts from "./components/PostEngagement/Reposts"
import Quotes from "./components/PostEngagement/Quotes"
import Likes from "./components/PostEngagement/Likes"
import Explore from "./components/Explore/Explore"

function App() {
  const [location, setLocation] = useState(window.location.pathname)

  const [openLoginModal, setOpenLoginModal] = useState(false)
  const handleOpenLoginModal = () => {
    setOpenLoginModal(true)
  }
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false)
    setLocation(window.location.pathname)
  }

  const [openSignupModal, setOpenSignupModal] = useState(false)
  const handleOpenSignupModal = () => {
    setOpenSignupModal(true)
  }
  const handleCloseSignupModal = () => {
    setOpenSignupModal(false)
    setLocation(window.location.pathname)
  }

  const user = useSelector((state: any) => state.user.user)
  const darkMode = useSelector((state: any) => state.theme.darkMode)

  const isMobile = useCheckMobileScreen()

  useEffect(() => {
    document.documentElement.style.setProperty("--color-theme", "dark")
  }, [])

  const appRef = useRef<any>(null)

  const [deltaY, setDeltaY] = useState(0)

  useEffect(() => {
    const handleWheel = (event: any) => {
      setDeltaY(event.deltaY)

      if (deltaY > 0) {
        // Scroll down
        // setScroll(10) // appRef.current.scrollTop += 10 // Adjust scroll amount as needed
      } else if (deltaY < 0) {
        // Scroll up
        // setScroll(-10)
        // appRef.current.scrollTop -= 10 // Adjust scroll amount as needed
      }
    }

    appRef.current.addEventListener("wheel", handleWheel)

    return () => appRef.current?.removeEventListener("wheel", handleWheel)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isMobile])

  return (
    <ThemeProvider theme={theme}>
      <div ref={appRef} className="app  relative flex  min-h-[100vh]  flex-row overflow-hidden bg-white text-black dark:bg-black  dark:text-white max-[540px]:flex-col xs:h-[100vh] xs:w-full">
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
            <Route path="/" element={<Landing openLoginModal={openLoginModal} handleOpenLoginModal={handleOpenLoginModal} handleCloseLoginModal={handleCloseLoginModal} openSignupModal={openSignupModal} handleOpenSignupModal={handleOpenSignupModal} handleCloseSignupModal={handleCloseSignupModal} location={location} setLocation={setLocation} />}></Route>
            <Route path="/home" element={<Home scroll={deltaY} />}>
              <Route path="diaries" element={<Diaries />} />
              <Route path="reels" element={<Reels />} />
              <Route path="" element={<Diaries />} />
            </Route>
            <Route path="/bookmarks" element={<Bookmarks scroll={deltaY} />}>
              <Route path="diaries" element={<Diaries />} />
              <Route path="reels" element={<Reels />} />
              <Route path="" element={<Diaries />} />
            </Route>
            <Route path="/:tag/:type/:id/engagement" element={<PostEngagement scroll={deltaY} />}>
              <Route path="likes" element={<Likes />}></Route>
              <Route path="quotes" element={<Quotes />}></Route>
              <Route path="reposts" element={<Reposts />}></Route>
              <Route path="" element={<Quotes />}></Route>
            </Route>
            <Route path="/explore" element={<Explore scroll={deltaY} />}></Route>
            <Route path="/password_reset" element={<PasswordReset setLocation={setLocation} />} />
            <Route path="/login" element={<Login openModal={true} handleCloseModal={handleCloseLoginModal} setLocation={setLocation} />} />
            <Route path="/signup" element={<SignUp openModal={true} setLocation={setLocation} handleCloseModal={handleCloseSignupModal} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
