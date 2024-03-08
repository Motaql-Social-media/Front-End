import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmPassword from "./ConfirmPassword"
import { useSelector } from "react-redux"
import { ArrowRight } from "@mui/icons-material"

const AccountInformations = () => {
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

  const user = useSelector((state: any) => state.user.user)

  const [passwordConfirmed, setPasswordConfirmed] = useState(sessionStorage.getItem("passwordConfirmed") === "true" ? true : false)

  const options = [
    {
      title: "Username",
      value: "@" + user.username,
      location: "/settings/username",
    },
    {
      title: "Phone Number",
      value: user.phoneNumber,
      location: "/settings/phone_number",
    },
    {
      title: "Email",
      value: user.email,
      location: "/settings/email",
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
          Account Information
        </div>
      </div>
      {!passwordConfirmed && <ConfirmPassword setPasswordConfirmed={setPasswordConfirmed} />}
      {passwordConfirmed && (
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
                <div className="text-gray-500">{option.value}</div>
              </div>
              <div>
                <ArrowRight />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AccountInformations
