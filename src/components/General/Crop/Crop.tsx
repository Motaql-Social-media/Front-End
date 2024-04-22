import { Cancel } from "@mui/icons-material"
import CropIcon from "@mui/icons-material/Crop"
import { Box, DialogActions, DialogContent, Slider } from "@mui/material"
import React, { useState } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "./utils/CropImage"

import { useTranslation } from "react-i18next"

const Crop = ({ photoURL, setOpenCrop, setClose, setPhotoURL, setFile, aspect, originalPhoto }: { photoURL: string; setOpenCrop: (open: boolean) => void; setClose?: any; setPhotoURL: (url: string) => void; setFile: (file: File) => void; aspect: number; originalPhoto: string }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleCropImage = () => {
    getCroppedImg(photoURL, croppedAreaPixels, rotation)
      .then((res: any) => {
        // console.log(res)
        setFile(res.file)
        setPhotoURL(res.url)
        setOpenCrop(false)
        setClose()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const { t } = useTranslation()
  return (
    <>
      <DialogContent
        dividers
        sx={{
          position: "relative",
          width: "auto",
          gap: 0,
          //   minWidth: { sm: 500 },
          overflowY: "",
          height: 400,
          margin: 0,
        }}
      >
        <div className="!mt-0 !h-fit">
          <Cropper image={photoURL} crop={crop} zoom={zoom} rotation={rotation} aspect={aspect} onZoomChange={setZoom} onRotationChange={setRotation} onCropChange={setCrop} onCropComplete={cropComplete} />
        </div>
      </DialogContent>

      <DialogActions sx={{ flexDirection: "column", mx: 3 }}>
        <div className="!mt-0 !h-fit w-full">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex" }}>
              <span className="mr-5 w-32 text-left">{t("zoom")} </span>
              <Slider valueLabelDisplay="auto" valueLabelFormat={zoomPercent} sx={{ color: "#40e5da" }} min={1} max={3} step={0.1} value={zoom} onChange={(e, zoom) => setZoom(zoom as number)} />
            </Box>
            <Box sx={{ display: "flex" }}>
              <span className="mr-5 w-32 text-left">{t("rotation")}</span>
              <Slider valueLabelDisplay="auto" sx={{ color: "#40e5da" }} min={0} max={360} value={rotation} onChange={(e, rotation) => setRotation(rotation as number)} />
            </Box>
          </Box>
        </div>
        <div className="!m-0 !mt-5 !h-fit w-full">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <button
              className="-mt-2 flex items-center justify-between rounded-full border border-primary px-2 font-bold text-primary hover:bg-primary hover:text-black "
              //   className={`${styles.normalButton}`}
              onClick={() => {
                setPhotoURL(originalPhoto)
                setOpenCrop(false)
                setClose()
              }}
            >
              <Cancel
                sx={{
                  width: 18,
                  height: 18,
                }}
              />
              <span>{t("cancel")}</span>
            </button>
            
            <button className="-mt-2 flex items-center justify-between rounded-full border border-primary px-2 font-bold text-primary hover:bg-primary hover:text-black " onClick={handleCropImage}>
              <CropIcon
                sx={{
                  width: 18,
                  height: 18,
                }}
              />
              <span>{t("crop")}</span>
            </button>
          </Box>
        </div>
      </DialogActions>
    </>
  )
}

export default Crop

const zoomPercent = (value: number) => {
  return `${Math.round(value * 100)}%`
}
