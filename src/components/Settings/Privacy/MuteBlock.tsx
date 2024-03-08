import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { ArrowBack as ArrowBackIcon, ArrowRight } from "@mui/icons-material"

const MuteBlock = () => {
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


  const options = [
    {
      title: "Block accounts",
      location: "/settings/blocked_accounts",
    },
    {
      title: "Muted accounts",
      location: "/settings/muted_accounts",
    },
  ]

  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center justify-start gap-7 pl-2">
        <div onClick={handleBack} className="cursor-pointer">
          <ArrowBackIcon fontSize="small" />
        </div>
        <div
          className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
          onClick={() => {
            window.location.reload()
          }}
        >
          Blocked and muted accounts
        </div>
      </div>

      <div>
        {options.map((option, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center justify-between p-3 hover:bg-darkHover"
            onClick={() => {
              navigate(option.location)
            }}
          >
            <div>
              <div className="text-lg font-semibold">{option.title}</div>
            </div>
            <div>
              <ArrowRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MuteBlock
