import { useEffect, useState } from "react"

import ThemeProvider from "@mui/material/styles/ThemeProvider"
import theme from "./styles/theme"
import Languages from "./components/Languages"
import Landing from "./components/LandingPage/Landing"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
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

import DiaryPage from "./components/PostPage/DiaryPage"
import ReelPage from "./components/PostPage/ReelPage"
import Notifications from "./components/Notifications/Notifications"
import All from "./components/Notifications/All"

import io from "socket.io-client"
import { createContext } from "react"
import Mentions from "./components/Notifications/Mentions"
import ReelsMentions from "./components/Notifications/ReelsMentions"
import DiariesMentions from "./components/Notifications/DiariesMentions"
import Followers from "./components/Profile/Followers"
import Followings from "./components/Profile/Followings"
import FollowersFollowings from "./components/Profile/FollowersFollowings"

import { GoogleOAuthProvider } from "@react-oauth/google"
import Settings from "./components/Settings/Settings"
import Account from "./components/Settings/Account/Account"
import Privacy from "./components/Settings/Privacy/Privacy"
import AccountInformations from "./components/Settings/Account/Information/AccountInformations"
import ChangeUsername from "./components/Settings/Account/Information/ChangeUsername"
import PasswordChange from "./components/Settings/Account/PasswordChange"
import ChangePhoneNumber from "./components/Settings/Account/Information/ChangePhoneNumber"
import ChangeEmail from "./components/Settings/Account/Information/ChangeEmail"
import MuteBlock from "./components/Settings/Privacy/MuteBlock"
import BlockedAccounts from "./components/Settings/Privacy/BlockedAccounts"
import MutedAccounts from "./components/Settings/Privacy/MutedAccounts"
import Profile from "./components/Profile/Profile"
import ProfileDiaries from "./components/Profile/ProfileDiaries"
import ProfileReels from "./components/Profile/ProfileReels"
import Trending from "./components/Trending/Trending"
import TrendDiaries from "./components/Trending/TrendDiaries"
import TrendReels from "./components/Trending/TrendReels"
import { useDispatch } from "react-redux"
import { receiveNotification } from "./store/NotificationSlice"
import PushNotification from "./components/Notifications/PushNotification"
import Messages from "./components/Messages/Messages"
import Message from "./components/Messages/Message"
import NotFound from "./components/General/NotFound"

const SocketContext = createContext<any>(null)
export { SocketContext }

function App() {
  const [socket, setSocket] = useState<any>(null)
  const userToken = useSelector((state: any) => state.user.token)

  useEffect(() => {
    setSocket(
      io("https://theline.social", {
        path: "/socket.io",
        withCredentials: true,
        extraHeaders: {
          token: userToken,
        },
      })
    )
  }, [])

  const dispatch = useDispatch()
  const [notification, setNotification] = useState<any>()
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Socket connected!")
      })
      socket.on("disconnect", () => {
        console.log("Socket disconnected!")
      })
      socket.on("notification-receive", (payload: any) => {
        dispatch(receiveNotification())
        setNotification(payload)
        // console.log(payload)
      })
    }
  }, [socket])

  useEffect(() => {
    if (notification) {
      setShowNotification(true)
      setTimeout(() => {
        setNotification(null)
        setShowNotification(false)
      }, 5000)
    }
  }, [notification])

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
    <GoogleOAuthProvider clientId="747286868244-5769tksecnl0s5jds76cdtj13phph6l7.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <SocketContext.Provider value={socket}>
          <div ref={appRef} className="app relative flex  min-h-[100vh]  flex-row  bg-white text-black dark:bg-black  dark:text-white max-[540px]:flex-col xs:h-[100vh] xs:w-full">
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
                <Route path="/notifications" element={<Notifications scroll={deltaY} />}>
                  <Route path="all" element={<All />} />
                  <Route path="mentions" element={<Mentions scroll={deltaY} />}>
                    <Route path="diaries" element={<DiariesMentions />} />
                    <Route path="reels" element={<ReelsMentions />} />
                    <Route path="" element={<DiariesMentions />} />
                  </Route>
                  <Route path="" element={<All />} />
                </Route>
                <Route path="/:tag/followers_followings" element={<FollowersFollowings scroll={deltaY} />}>
                  <Route path="followers" element={<Followers />}></Route>
                  <Route path="followings" element={<Followings />}></Route>
                </Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/settings/privacy" element={<Privacy />} />
                <Route path="/settings/account_information" element={<AccountInformations />} />
                <Route path="/settings/username" element={<ChangeUsername />} />
                <Route path="/settings/password" element={<PasswordChange />} />
                <Route path="/settings/phone_number" element={<ChangePhoneNumber />} />
                <Route path="/settings/email" element={<ChangeEmail />} />
                <Route path="/settings/mute_block" element={<MuteBlock />} />
                <Route path="/settings/blocked_accounts" element={<BlockedAccounts />} />
                <Route path="/settings/muted_accounts" element={<MutedAccounts />} />
                <Route path="/settings/account" element={<Account />} />

                <Route path="/:tag" element={<Profile scroll={deltaY} />}>
                  <Route path="diaries" element={<ProfileDiaries />} />
                  <Route path="reels" element={<ProfileReels />} />
                  <Route path="" element={<ProfileDiaries />} />
                </Route>
                <Route path="/trending" element={<Trending scroll={deltaY} />}>
                  <Route path=":query/diaries" element={<TrendDiaries />} />
                  <Route path=":query/reels" element={<TrendReels />} />
                  <Route path="" element={<TrendDiaries />} />
                </Route>
                <Route path="/messages" element={<Messages scroll={deltaY} />}></Route>
                <Route path="/messages/:id" element={<Message scroll={deltaY} />} />

                <Route path="/:tag/diary/:id" element={<DiaryPage scroll={deltaY} />} />
                <Route path="/:tag/reel/:id" element={<ReelPage scroll={deltaY} />} />
                <Route path="/explore" element={<Explore scroll={deltaY} />} />
                <Route path="/password_reset" element={<PasswordReset setLocation={setLocation} />} />
                <Route path="/login" element={<Login openModal={true} handleCloseModal={handleCloseLoginModal} setLocation={setLocation} />} />
                <Route path="/signup" element={<SignUp openModal={true} setLocation={setLocation} handleCloseModal={handleCloseSignupModal} />} />
                <Route path="/404" element={<NotFound />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
              {showNotification && location.split("/").pop() !== "notifications" && <PushNotification content={notification.content} createdAt={notification.createdAt} isSeen={notification.isSeen} metadata={notification.metadata} notificationFrom={notification.notificationFrom} notificationId={notification.notificationId} type={notification.type} />}
            </BrowserRouter>
          </div>
        </SocketContext.Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
