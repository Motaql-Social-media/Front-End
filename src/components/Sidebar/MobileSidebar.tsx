import { Avatar } from "@mui/material"
import Logo from "../../assets/images/mainLogo.svg"

import { useState } from "react"

import Drawer from "@mui/material/Drawer"
import DesktopSidebar from "./DesktopSidebar"

import { useSelector } from "react-redux"

import { useEffect } from "react"

const MobileSidebar = ({ optionsNames, optionsIcons, optionLinks, selected, handleLogout }: { optionsNames: string[]; optionsIcons: any[]; optionLinks: string[]; selected: number; handleLogout: any }) => {
  const [open, setOpen] = useState(false)

  const user = useSelector((state: any) => state.user.user)

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = currentScrollPos > prevScrollPos
      setPrevScrollPos(currentScrollPos)

      // Check if scrolling down
      if (isScrollingDown) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollPos])

  const [isVisible, setIsVisible] = useState(true)

  //   useEffect(() => {
  //     const handleWheel = (event: any) => {
  //       if (typeof event.deltaY !== "undefined") {
  //         // Check for wheel event
  //         setIsVisible(event.deltaY < 0)
  //       }
  //     }

  //     const handleTouch = (event: any) => {
  //       setIsVisible(Math.abs(event.deltaY) > 0)
  //     }

  //     window.addEventListener("wheel", handleWheel)
  //     window.addEventListener("touchmove", handleTouch)

  //     return () => {
  //       window.removeEventListener("wheel", handleWheel)
  //       window.removeEventListener("touchmove", handleTouch)
  //     }
  //   }, [])

  return (
    <div className={` fixed left-0 top-0 bg-black ${isVisible ? "opacity-100" : "opacity-0"} z-[99] flex w-full items-center p-5 transition-opacity duration-300 `}>
      <div
        onClick={() => {
          if (!open && isVisible) setOpen(true)
        }}
      >
        <Avatar alt={user.name} src={`${process.env.REACT_APP_MEDIA_URL}${user.imageUrl}`} />
      </div>
      <div
        className=" absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={() => {
          window.location.reload()
        }}
      >
        <img src={Logo} alt="logo" className=" h-8 w-12" />
      </div>
      <Drawer
        sx={{
          width: "200px",
        }}
        open={open}
        onClose={() => {
          if (open && isVisible) setOpen(false)
        }}
      >
        <div className=" relative h-[100vh] w-[200px]  bg-white text-black dark:bg-black  dark:text-white">
          <DesktopSidebar optionsNames={optionsNames} optionsIcons={optionsIcons} optionLinks={optionLinks} selected={selected} shrink={false} handleLogout={handleLogout} mobile={true} />
        </div>
      </Drawer>
    </div>
  )
}

export default MobileSidebar
