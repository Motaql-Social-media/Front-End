import React from "react"

import { t } from "i18next"
import CustomWebcam from "../../components/General/CustomWebcam"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import Modal from "@mui/material/Modal"
import { Close } from "@mui/icons-material"
import PaidIcon from "@mui/icons-material/Paid"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import { TextField } from "@mui/material"
import { styles } from "../../styles/styles"
import { useParams } from "react-router-dom"

function VerficationInformation({ imgSrc, setImgSrc, name, setName, imgFile, setImgFile }: { imgSrc: any; setImgSrc: any; name: string; setName: any;imgFile: any; setImgFile: any}) {
  const [openModal, setOpenModal] = React.useState(false)
  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const { type } = useParams<{ type: string }>()

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  // Update the window width when the component mounts
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const modalStyle: modalStyleT = {
    position: "absolute",
    borderRadius: "16px",
    backgroundColor: "black",
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

  const [color, setColor] = React.useState("interestedColor")

  React.useEffect(() => {
    if (type === "interested") setColor("interestedColor")
    else if (type === "professional") setColor("primary")
    else setColor("businessColor")
  }, [type])


  return (
    <>
      <div className="p-5">
        <div className="text-2xl">{t("verfication_information")}</div>

        <div className="mt-3 w-full rounded-2xl border border-darkBorder p-3">
          <div className="border-b border-b-darkBorder pb-2">
            <div className="mb-4 flex w-full items-center justify-around gap-4">
              <DriveFileRenameOutlineIcon />
              <div>{t("subscriper_name")}</div>
              <div className="flex-grow"></div>
            </div>
            <TextField
              label={t("complete_name")}
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              inputProps={{ onPaste: (e) => e.preventDefault() }}
              InputLabelProps={{
                style: { color: "#40e5da", textAlign: "right" },
              }}
              sx={styles.textField}
            />
          </div>
          <div className="mb-5 mt-3 flex w-full items-center justify-around gap-4">
            <AccountCircleIcon />
            <div>{t("live_photo")}</div>
            <div className="flex-grow"></div>
            <div className="cursor-pointer" onClick={handleOpenModal}>
              <CameraAltIcon />
            </div>
          </div>
          <div>
            <div className="flex w-full items-center justify-around gap-4">
              <PaidIcon />
              <div>{t("subscription_type")}</div>
              <div className="flex-grow"></div>
            </div>
            <div className={`text-${color} mt-1 text-2xl font-bold`}>{t(type || "")}</div>
          </div>
        </div>
      </div>
      <Modal open={openModal} onClose={handleCloseModal} disableEscapeKeyDown disablePortal>
        <div style={modalStyle} className={`h-[90%] w-[40%] rounded-2xl border bg-black p-4 dark:border-darkBorder dark:bg-black`}>
          <div className="w-fit cursor-pointer rounded-full  p-1 text-white hover:bg-darkHover" onClick={handleCloseModal}>
            <Close />
          </div>
          <CustomWebcam imgSrc={imgSrc} setImgSrc={setImgSrc} handleCloseModal={handleCloseModal} imgFile={imgFile} setImgFile={setImgFile} />
        </div>
      </Modal>
    </>
  )
}

export default VerficationInformation
