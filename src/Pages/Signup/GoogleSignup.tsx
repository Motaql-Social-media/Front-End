import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { Modal, Box } from "@mui/material"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import GFirstStep from "../../components/Signup/GFirstStep"
import GSecondStep from "../../components/Signup/GSecondStep"
import ErrorPage from "../../components/Signup/ErrorPage"

import Logo from "../../assets/images/mainLogo.svg"

import i18next from "i18next"

const GoogleSignup = ({ openModal, handleCloseModal, access_token, name }: { openModal: boolean; handleCloseModal: () => void; access_token: string; name: string }) => {
  const navigate = useNavigate()

  const [speciality, setSpeciality] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [gPosition, setGPosition] = useState(-1)

  function GnextShow() {
    const FirstStep = document.getElementById("Google First Step")
    const SecondStep = document.getElementById("Google Second Step")
    const ThirdStep = document.getElementById("Google Third Step")

    if (FirstStep) FirstStep.style.display = "none"
    if (SecondStep) SecondStep.style.display = "none"
    if (ThirdStep) ThirdStep.style.display = "none"

    // console.log("GoogleSignup", gPosition)

    switch (gPosition) {
      case 0:
        if (FirstStep) FirstStep.style.display = "block"
        break
      case 1:
        if (SecondStep) SecondStep.style.display = "block"
        break
      case 2:
        if (ThirdStep) ThirdStep.style.display = "block"
        break
      default:
        break
    }
  }

  useEffect(GnextShow, [gPosition])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

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

  useEffect(() => {
    if (!openModal) {
      if (gPosition >= 0) setGPosition(-1)
      const FirstStep = document.getElementById("Google First Step")
      const SecondStep = document.getElementById("Google Second_Step")
      const ThirdStep = document.getElementById("Google Third_Step")

      if (FirstStep) FirstStep.setAttribute("display", "none")
      if (SecondStep) SecondStep.setAttribute("display", "none")
      if (ThirdStep) ThirdStep.setAttribute("display", "none")
    } else setGPosition(0)
  }, [openModal])

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none"
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none"
  }

  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal} disableEscapeKeyDown disablePortal>
        <Box style={modalStyle} sx={{ overflow: "hidden" }}>
          <div ref={ref} className="relative h-full min-w-[350px] bg-white dark:bg-black md:rounded-2xl">
            <button
              className="relative  top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover"
              onClick={() => {
                // setLocation("/")
                navigate("/")
                handleCloseModal()
              }}
            >
              x
            </button>
            <img src={Logo} alt="Logo" className={`-mt-4 ${i18next.language === "ar" ? "mr-[45%]" : "ml-[45%]"} w-[40px]`} />

            <GFirstStep name={name} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} speciality={speciality} setSpeciality={setSpeciality} month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} setPosition={setGPosition} position={gPosition} />
            <GSecondStep name={name} phoneNumber={phoneNumber} speciality={speciality} month={month} day={day} year={year} access_token={access_token} setPosition={setGPosition} position={gPosition} />
            <ErrorPage setDay={setDay} setMonth={setMonth} setYear={setYear} setNickName={() => {}} setEmail={() => {}} handleCloseModal={handleCloseModal} />
          </div>
          <div
            className={`top-8 text-white ${document.body.dir === "rtl" ? "left-5" : "right-5"} absolute cursor-pointer ${(gPosition === 0 || gPosition === 7 || gPosition === 8) && `hidden`}`}
            onClick={() => {
              if (gPosition > 0) setGPosition((prev) => prev - 1)
            }}
          >
            <ArrowBackIcon />
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default GoogleSignup
