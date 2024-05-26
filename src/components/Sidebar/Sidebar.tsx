import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded"
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TagIcon from "@mui/icons-material/Tag"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SettingsIcon from "@mui/icons-material/Settings"
import Badge from "@mui/material/Badge"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import Groups2Icon from "@mui/icons-material/Groups2"
import VerifiedIcon from "@mui/icons-material/Verified"

import HomeIcon from "@mui/icons-material/Home"
import NotificationsIcon from "@mui/icons-material/Notifications"
import EmailIcon from "@mui/icons-material/Email"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import PersonIcon from "@mui/icons-material/Person"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined"
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore"
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined"
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { logoutUser } from "../../store/UserSlice"
import { useDispatch } from "react-redux"
import MobileSidebar from "./MobileSidebar"
import DesktopSidebar from "./DesktopSidebar"
import axios from "axios"

import { setUnseenCount } from "../../store/NotificationSlice"
import { setMessageUnseenCount } from "../../store/MessageSlice"
import { logout } from "../../store/AdminUserSlice"
const Sidebar = () => {
  const darkMode = useSelector((state: any) => state.theme.darkMode)

  const { t } = useTranslation()

  const unseenCount = useSelector((state: any) => state.notification.unseenCount)
  const messageUnseenCount = useSelector((state: any) => state.message.unseenCount)

  const user = useSelector((state: any) => state.user.user)
  const optionsNamesInit = ["home", "trending", "explore", "notifications", "pioneers", "marketplace", "opportunities", "messages", "bookmarks", "profile", "settings"]
  const optionsIconsInit = [
    [<HomeOutlinedIcon />, <HomeIcon />],
    [<TrendingUpIcon />, <TrendingUpIcon />],
    [<TagIcon sx={{ color: darkMode ? "#ffffff" : "#000000" }} />, <TagIcon sx={{ color: darkMode ? "#ffffff" : "#000000" }} />],
    [
      <Badge
        badgeContent={unseenCount}
        sx={{
          ".MuiBadge-badge": {
            backgroundColor: "#40e5da",
            color: "white",
          },
        }}
      >
        <NotificationsNoneRoundedIcon />
      </Badge>,
      <Badge
        badgeContent={unseenCount}
        sx={{
          ".MuiBadge-badge": {
            backgroundColor: "#40e5da",
            color: "white",
          },
        }}
      >
        <NotificationsIcon />
      </Badge>,
    ],
    [<ManageAccountsOutlinedIcon />, <ManageAccountsIcon />],
    [<LocalGroceryStoreOutlinedIcon />, <LocalGroceryStoreIcon />],
    [<BusinessCenterOutlinedIcon />, <BusinessCenterIcon />],
    [
      <Badge
        badgeContent={messageUnseenCount}
        sx={{
          ".MuiBadge-badge": {
            backgroundColor: "#40e5da",
            color: "white",
          },
        }}
      >
        <MailOutlineRoundedIcon />
      </Badge>,
      <Badge
        badgeContent={messageUnseenCount}
        sx={{
          ".MuiBadge-badge": {
            backgroundColor: "#40e5da",
            color: "white",
          },
        }}
      >
        <EmailIcon />
      </Badge>,
    ],
    [<BookmarkBorderOutlinedIcon />, <BookmarkIcon />],
    [<PersonOutlinedIcon />, <PersonIcon />],
    [<SettingsOutlinedIcon />, <SettingsIcon />],
  ]
  const optionsLinksInit = ["/home", "/trending", "/explore", "/notifications", "/", "/", "/", "/messages", "/bookmarks", `/${user?.username}`, "/settings"]
  const controlOptionsNames = [t("employees"), t("subscriptions")]
  const controlOptionsIcons = [
    [<Groups2OutlinedIcon />, <Groups2Icon />],
    [<VerifiedOutlinedIcon />, <VerifiedIcon />],
  ]
  const controlOptionsLinks = ["/control_panel/employees", "/control_panel/subscriptions"]
  const [optionsNames, setOptionsNames] = useState(optionsNamesInit)
  const [optionsIcons, setOptionsIcons] = useState(optionsIconsInit)
  const [optionLinks, setOptionsLinks] = useState(optionsLinksInit)

  const pathname = useLocation().pathname

  const cnu = useSelector((state: any) => state.cnu.cnu)

  useEffect(() => {
    if (pathname.split("/")[1] === "control_panel") {
      if (cnu?.type === "ADMIN") {
        setOptionsNames(controlOptionsNames)
        setOptionsIcons(controlOptionsIcons)
        setOptionsLinks(controlOptionsLinks)
      } else {
        setOptionsNames(controlOptionsNames.slice(1))
        setOptionsIcons(controlOptionsIcons.slice(1))
        setOptionsLinks(controlOptionsLinks.slice(1))
      }
    } else {
      setOptionsNames(optionsNamesInit)
      setOptionsIcons(optionsIconsInit)
      setOptionsLinks(optionsLinksInit)
    }
  }, [pathname])

  const [selected, setSelected] = useState(optionLinks.indexOf(pathname))

  const navigate = useNavigate()

  const [shrink, setShrink] = useState(window.innerWidth < 1278)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1278) setShrink(true)
      else setShrink(false)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  useEffect(() => {
    API.get("users/current/notifications/unseen-count")
      .then((res) => {
        dispatch(setUnseenCount(res.data.data.count))
      })
      .catch((err) => {
        console.log(err)
      })

    API.get("chats/unseen-chats-count")
      .then((res) => {
        // console.log(res.data.data.count)
        dispatch(setMessageUnseenCount(res.data.data.count))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const dispatch = useDispatch()

  const handleLogout = () => {
    if (window.location.pathname.split("/")[1] === "control_panel") {
      dispatch(logout())
      navigate("/admin_landing")
    } else {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      sessionStorage.removeItem("passwordIsConfirmed")
      dispatch(logoutUser())
      navigate("/")
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    setSelected(optionLinks.indexOf(pathname))
  }, [pathname])
  // Update the window width when the component mounts
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  type modalStyleT = {
    position: React.CSSProperties["position"]
    backgroundColor: React.CSSProperties["backgroundColor"]
    border: React.CSSProperties["border"]
    borderRadius: React.CSSProperties["borderRadius"]
    width?: React.CSSProperties["width"]
    height?: React.CSSProperties["height"]
    maxWidth?: React.CSSProperties["maxWidth"]
    top?: React.CSSProperties["top"]
    left?: React.CSSProperties["left"]
    transform?: React.CSSProperties["transform"]
  }
  const modalStyle: modalStyleT = {
    position: "absolute",

    backgroundColor: "transparent",
    border: "1px solid #767C86",
    borderRadius: "16px",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  }

  return (
    <>
      {windowWidth > 540 && <DesktopSidebar optionsNames={optionsNames} optionsIcons={optionsIcons} optionLinks={optionLinks} selected={selected} shrink={shrink} handleLogout={handleLogout} mobile={false} />}

      {windowWidth <= 540 && <MobileSidebar optionsNames={optionsNames} optionsIcons={optionsIcons} optionLinks={optionLinks} selected={selected} handleLogout={handleLogout} />}
    </>
  )
}

export default Sidebar
