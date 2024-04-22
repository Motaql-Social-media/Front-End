import React from "react"
import Webcam from "react-webcam"
import CameraIcon from "@mui/icons-material/Camera"
import ReplayIcon from "@mui/icons-material/Replay"
import CheckIcon from "@mui/icons-material/Check"
import { t } from "i18next"

const CustomWebcam = ({ imgSrc, setImgSrc, handleCloseModal, imgFile, setImgFile }: { imgSrc: any; setImgSrc: any; handleCloseModal: any; imgFile: any; setImgFile: any }) => {
  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    const imageSrc = (webcamRef.current as any)?.getScreenshot()
    if (imageSrc) {
      const byteString = atob(imageSrc.split(",")[1])
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      const file = new Blob([ab], { type: "image/jbeg" })
      setImgFile(file)
    }
    setImgSrc(imageSrc)
  }, [webcamRef])

  const retake = () => {
    setImgSrc(null)
  }

  const [mediaError, setMediaError] = React.useState(false)

  const handleMediaError = (error: any) => {
    setMediaError(true)
  }

  return (
    <div className="mt-5">
      <div>{imgSrc ? <img src={imgSrc} alt="webcam" /> : <Webcam height={"auto"} width={"auto"} ref={webcamRef} onUserMediaError={handleMediaError} />}</div>
      {mediaError && <div className="text-red-500">{t("webcam_error")}</div>}
      {!mediaError && <div className="mt-5 text-center text-primary">{t("webcam_message")}</div>}
      <div className="my-5 flex w-full items-center justify-around">
        {imgSrc ? (
          <>
            <div className="cursor-pointer rounded-full bg-primary p-2 font-semibold text-black hover:bg-primaryHover" onClick={handleCloseModal}>
              {t("confirm")}
              <CheckIcon />
            </div>
            <div className="cursor-pointer rounded-full bg-primary p-2 font-semibold text-black hover:bg-primaryHover" onClick={retake}>
              {t("retake_photo")}
              <ReplayIcon />
            </div>
          </>
        ) : (
          <div onClick={capture} className="cursor-pointer rounded-full bg-primary p-2 font-semibold text-black hover:bg-primaryHover">
            {t("capture_photo")}
            <CameraIcon />
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomWebcam
