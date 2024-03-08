import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material"
import { useSelector } from "react-redux"
import axios from "axios"
import SettingsPersonContainer from "../SettingsPersonContainer"

const MutedAccounts = () => {
  const navigate = useNavigate()

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

  const handleBack = () => {
    navigate(-1)
  }

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)

  const [muted, setMuted] = useState([])

  useEffect(() => {
    API.get(`users/current/muted`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data.data.muted)
        setMuted(res.data.data.muted)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <div className="flex items-center justify-start gap-7 pl-2  ">
        <div onClick={handleBack} className="cursor-pointer">
          <ArrowBackIcon fontSize="small" />
        </div>
        <div
          className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
          onClick={() => {
            window.location.reload()
          }}
        >
          Muted accounts
        </div>
      </div>
      <div className="border-t border-t-darkBorder py-3">
        {muted.length === 0 && <div className="text-center text-xl font-semibold text-gray-500">No Muted accounts</div>}
        {muted.length > 0 && <SettingsPersonContainer people={muted} type="mute" />}
      </div>
    </div>
  )
}

export default MutedAccounts
