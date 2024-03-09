import ArrowBack from "@mui/icons-material/ArrowBack"
import { ArrowForward } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import i18next from "i18next"
import { t } from "i18next"

const SubpageNavbar = ({ title }: { title: string }) => {
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
  return (
    <div className={`flex items-center justify-start gap-7 ${i18next.language === "en" ? "pl-2" : "pr-2"}  max-[540px]:hidden`}>
      <div onClick={handleBack} className="cursor-pointer">
        {i18next.language === "en" && <ArrowBack fontSize="small" />}
        {i18next.language === "ar" && <ArrowForward fontSize="small" />}
      </div>
      <div
        className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
        onClick={() => {
          window.location.reload()
        }}
      >
        {t(title)}
      </div>
    </div>
  )
}

export default SubpageNavbar
