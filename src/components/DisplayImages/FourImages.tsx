import { useEffect, useState, useCallback } from "react"
import ImageViewer from "react-simple-image-viewer"

const FourImages = ({ image1, image2, image3, image4, showCancelButton, handleDeleteMedia }: { image1: string; image2: string; image3: string; image4: string; showCancelButton: boolean; handleDeleteMedia: any }) => {
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

  const [imageAspectRatio1, setImageAspectRatio1] = useState(0)
  const [imageAspectRatio2, setImageAspectRatio2] = useState(0)
  const [imageAspectRatio3, setImageAspectRatio3] = useState(0)
  const [imageAspectRatio4, setImageAspectRatio4] = useState(0)

  const [imageHeight1, setImageHeight1] = useState(0)
  const [imageHeight2, setImageHeight2] = useState(0)
  const [imageHeight3, setImageHeight3] = useState(0)
  const [imageHeight4, setImageHeight4] = useState(0)
  const [heightSum, setHeightSum] = useState(0)

  const [flexDirection1, setFlexDirection1] = useState("row")
  const [flexDirection2, setFlexDirection2] = useState("row")
  const [flexDirection3, setFlexDirection3] = useState("row")

  useEffect(() => {
    getImageHeight(image1)
      .then((height) => {
        setImageHeight1(height)
      })
      .catch((err) => {
        console.log(err)
      })

    getImageHeight(image2)
      .then((height) => {
        setImageHeight2(height)
      })
      .catch((err) => {
        console.log(err)
      })

    getImageHeight(image3)
      .then((height) => {
        setImageHeight3(height)
      })
      .catch((err) => {
        console.log(err)
      })

    getImageHeight(image4)
      .then((height) => {
        setImageHeight4(height)
      })
      .catch((err) => {
        console.log(err)
      })

    getImageAspectRatio(image1)
      .then((aspectRatio) => {
        setImageAspectRatio1(aspectRatio)
      })
      .catch((err) => {
        console.log(err)
      })

    getImageAspectRatio(image2)
      .then((aspectRatio) => {
        setImageAspectRatio2(aspectRatio)
      })
      .catch((err) => {
        console.log(err)
      })

    getImageAspectRatio(image3)
      .then((aspectRatio) => {
        setImageAspectRatio3(aspectRatio)
      })
      .catch((err) => {
        console.log(err)
      })

    getImageAspectRatio(image4)
      .then((aspectRatio) => {
        setImageAspectRatio4(aspectRatio)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [image1, image2, image3, image4])

  useEffect(() => {
    setHeightSum(imageHeight1 + imageHeight2 + imageHeight3 + imageHeight4)
  }, [imageHeight1, imageHeight2, imageHeight3, imageHeight4])

  useEffect(() => {
    if (imageAspectRatio1 === 0 || imageAspectRatio2 === 0 || imageAspectRatio3 === 0 || imageAspectRatio4 === 0) return

    // console.log("AspectRations", imageAspectRatio1, imageAspectRatio2, imageAspectRatio3, imageAspectRatio4)

    if (imageAspectRatio1 > 1 && imageAspectRatio2 > 1 && imageAspectRatio3 > 1 && imageAspectRatio4 > 1) {
      setFlexDirection1("column")
      setFlexDirection2("column")
      setFlexDirection3("column")
    } else if (imageAspectRatio1 < 0.9 && imageAspectRatio2 < 0.9 && imageAspectRatio3 < 0.9 && imageAspectRatio4 < 0.9) {
      setFlexDirection1("row")
      setFlexDirection2("row")
      setFlexDirection3("row")
    } else {
      setFlexDirection1("column")
      setFlexDirection2("row")
      setFlexDirection3("row")
    }
  }, [imageAspectRatio1, imageAspectRatio2, imageAspectRatio3,imageAspectRatio4])

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
    <div className={`flex ${flexDirection1 === "row" ? "flex-row" : "flex-col"}  h-[550px] max-h-[550px] gap-1 overflow-hidden`}>
      <div className={`flex gap-1 ${flexDirection2 === "row" ? "flex-row" : "flex-col"} ${flexDirection1 === "row" ? "h-full w-[50%]" : "h-[50%] w-full"}`}>
        <div className={`relative ${flexDirection2 === "row" ? "h-full w-[50%]" : "h-[50%] w-full"} `}>
          <img src={image1} className={`h-full w-full object-cover`} alt="media" loading="lazy" onClick={() => openImageViewer(0)} />
          {showCancelButton && (
            <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(image1, 0)}>
              x
            </div>
          )}
        </div>
        <div className={`relative ${flexDirection2 === "row" ? "h-full w-[50%]" : "h-[50%] w-full"} `}>
          <img src={image2} className={`h-full w-full object-cover`} alt="media" loading="lazy" onClick={() => openImageViewer(1)} />
          {showCancelButton && (
            <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(image2, 1)}>
              x
            </div>
          )}
        </div>
      </div>
      <div className={`flex gap-1 ${flexDirection3 === "row" ? "flex-row" : "flex-col"} ${flexDirection1 === "row" ? "h-full w-[50%]" : "h-[50%] w-full"}`}>
        <div className={`relative ${flexDirection2 === "row" ? "h-full w-[50%]" : "h-[50%] w-full"} `}>
          <img src={image3} className={`h-full w-full object-cover`} alt="media" loading="lazy" onClick={() => openImageViewer(2)} />
          {showCancelButton && (
            <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(image3, 2)}>
              x
            </div>
          )}
        </div>
        <div className={`relative ${flexDirection2 === "row" ? "h-full w-[50%]" : "h-[50%] w-full"} `}>
          <img src={image4} className={`h-full w-full object-cover`} alt="media" loading="lazy" onClick={() => openImageViewer(3)} />
          {showCancelButton && (
            <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(image4, 3)}>
              x
            </div>
          )}
        </div>
      </div>
      {isViewerOpen && (
        <div className="z-[99]" dir="ltr">
          <ImageViewer disableScroll={true} src={[image1, image2, image3, image4]} currentIndex={currentImage} closeOnClickOutside={true} onClose={closeImageViewer} />
        </div>
      )}
    </div>
  )
}

export default FourImages
