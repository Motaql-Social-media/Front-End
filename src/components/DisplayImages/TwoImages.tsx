import { useState, useCallback, useEffect, useRef } from "react"
import ImageViewer from "react-simple-image-viewer"

const TwoImages = ({ image1, image2, showCancelButton, handleDeleteMedia }: { image1: string; image2: string; showCancelButton: boolean; handleDeleteMedia: any }) => {
  const getImageAspectRatio = async (img: string) => {
    return new Promise<number>((resolve, reject) => {
      const image = new Image()
      image.src = img
      image.onload = () => {
        resolve(image.width / image.height)
      }
      image.onerror = (err) => {
        reject(err)
      }
    })
  }

  const getImageHeight = async (img: string) => {
    return new Promise<number>((resolve, reject) => {
      const image = new Image()
      image.src = img
      image.onload = () => {
        resolve(image.height)
      }
      image.onerror = (err) => {
        reject(err)
      }
    })
  }

  const [imageHeight1, setImageHeight1] = useState(0)
  const [imageHeight2, setImageHeight2] = useState(0)
  const [heightSum, setHeightSum] = useState(0)

  const [imageAspectRatio1, setImageAspectRatio1] = useState(0)
  const [imageAspectRatio2, setImageAspectRatio2] = useState(0)

  const [flexDirection, setFlexDirection] = useState("row")

  useEffect(() => {
    getImageHeight(image1)
      .then((height) => {
        setImageHeight1(height)
      })
      .catch((err) => {
        // console.log(err)
      })

    getImageHeight(image2)
      .then((height) => {
        setImageHeight2(height)
      })
      .catch((err) => {
        // console.log(err)
      })

    getImageAspectRatio(image1)
      .then((aspectRatio) => {
        setImageAspectRatio1(aspectRatio)
      })
      .catch((err) => {
        // console.log(err)
      })

    getImageAspectRatio(image2)
      .then((aspectRatio) => {
        setImageAspectRatio2(aspectRatio)
      })
      .catch((err) => {
        // console.log(err)
      })
  }, [image1, image2])

  useEffect(() => {
    setHeightSum(imageHeight1 + imageHeight2)
  }, [imageHeight1, imageHeight2])

  useEffect(() => {
    if (imageAspectRatio1 === 0 || imageAspectRatio2 === 0) return

    // console.log("imageAspectRatio1", imageAspectRatio1)
    // console.log("imageAspectRatio2", imageAspectRatio2)

    if (imageAspectRatio1 < 1 && imageAspectRatio2 < 1) {
      setFlexDirection("row")
    } else if (imageAspectRatio1 > 1 && imageAspectRatio2 > 1) {
      setFlexDirection("column")
    } else {
      if (imageAspectRatio1 > imageAspectRatio2) {
        setFlexDirection("column")
      } else {
        setFlexDirection("row")
      }
    }
  }, [imageAspectRatio1, imageAspectRatio2, image1, image2])

  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  return (
    <div className={`flex ${flexDirection === "row" ? "flex-row" : "flex-col"} ${heightSum > 500 ? "h-[550px]" : "h-fit"} max-h-[550px] gap-1 overflow-hidden`}>
      <div className={`relative ${flexDirection === "row" ? "h-full w-[50%]" : "h-[50%] w-full"}`}>
        <img src={image1} className={`h-full w-full object-cover`} alt="media" loading="lazy" onClick={() => openImageViewer(0)} />
        {showCancelButton && (
          <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(image1, 0)}>
            x
          </div>
        )}
      </div>
      <div className={`relative ${flexDirection === "row" ? "h-full w-[50%]" : "h-[50%] w-full"}`}>
        <img src={image2} className={`h-full w-full object-cover`} alt="media" loading="lazy" onClick={() => openImageViewer(1)} />
        {showCancelButton && (
          <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(image2, 1)}>
            x
          </div>
        )}
      </div>
      {isViewerOpen && (
        <div className="z-[99]" dir="ltr">
          <ImageViewer disableScroll={true} src={[image1, image2]} currentIndex={currentImage} closeOnClickOutside={true} onClose={closeImageViewer} />
        </div>
      )}
    </div>
  )
}

export default TwoImages
