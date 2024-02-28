import React, { useEffect, useState, useCallback, useRef } from "react"
import ImageViewer from "react-simple-image-viewer"

const ThreeImages = ({ image1, image2, image3, showCancelButton, handleDeleteMedia }: { image1: string; image2: string; image3: string; showCancelButton: boolean; handleDeleteMedia: any }) => {
  const getImageAspectRatio = async (img: string) => {
    return new Promise<number>((resolve, reject) => {
      const image = new Image()
      image.src = img
      image.onload = () => {
        // if (img === "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw") console.log("fox", image.width / image.height)
        // if (img === "https://imgupscaler.com/images/samples/animal-before.webp") console.log("parrot", image.width / image.height)
        // if (img === "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg") console.log("view", image.width / image.height)

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

  const [imageHeight1, setImageHeight1] = useState(0)
  const [imageHeight2, setImageHeight2] = useState(0)
  const [imageHeight3, setImageHeight3] = useState(0)
  const [heightSum, setHeightSum] = useState(0)

  const [flexDirection1, setFlexDirection1] = useState("row")
  const [flexDirection2, setFlexDirection2] = useState("row")

  const [lowestAspectRatioImage, setLowestAspectRatioImage] = useState("")
  const [lowestAspectRatioImageindex, setLowestAspectRatioImageindex] = useState(0)

  useEffect(() => {
    if (imageAspectRatio1 < imageAspectRatio2 && imageAspectRatio1 < imageAspectRatio3) {
      setLowestAspectRatioImage(image1)
      //   console.log(image1)
      setLowestAspectRatioImageindex(0)
    } else if (imageAspectRatio2 < imageAspectRatio1 && imageAspectRatio2 < imageAspectRatio3) {
      setLowestAspectRatioImage(image2)
      //   console.log(image2)
      setLowestAspectRatioImageindex(1)
    } else if (imageAspectRatio3 < imageAspectRatio1 && imageAspectRatio3 < imageAspectRatio2) {
      setLowestAspectRatioImage(image3)
      //   console.log(image3)
      setLowestAspectRatioImageindex(2)
    }
  }, [imageAspectRatio1, imageAspectRatio2, imageAspectRatio3])

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
  }, [image1, image2, image3])

  useEffect(() => {
    setHeightSum(imageHeight1 + imageHeight2 + imageHeight3)
  }, [imageHeight1, imageHeight2, imageHeight3])

  useEffect(() => {
    if (imageAspectRatio1 === 0 || imageAspectRatio2 === 0 || imageAspectRatio3 === 0) return

    if (imageAspectRatio1 > 1 && imageAspectRatio2 > 1 && imageAspectRatio3 > 1) {
      setFlexDirection1("column")
      setFlexDirection2("column")
    } else if (imageAspectRatio1 < 1 && imageAspectRatio2 < 1 && imageAspectRatio3 < 1) {
      setFlexDirection1("row")
      setFlexDirection2("row")
    } else {
      setFlexDirection1("row")
      setFlexDirection2("column")
    }
  }, [imageAspectRatio1, imageAspectRatio2, imageAspectRatio3])

  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  useEffect(() => {
    if (imgRef1.current) {
      if (flexDirection1 === "row" && flexDirection2 === "column") {
        imgRef1.current.src = lowestAspectRatioImage
      } else {
        imgRef1.current.src = image1
      }
    }
    if (imgRef2.current) {
      if (flexDirection1 === "row" && flexDirection2 === "column" && lowestAspectRatioImage === image3) {
        imgRef2.current.src = image1
      } else {
        imgRef2.current.src = image3
      }
    }
  }, [lowestAspectRatioImage, image1, image2, image3, flexDirection1, flexDirection2])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  const imgRef1 = useRef<HTMLImageElement>(null)
  const imgRef2 = useRef<HTMLImageElement>(null)

  return (
    <div className={`flex ${flexDirection1 === "row" ? "flex-row" : "flex-col"} ${heightSum > 500 ? "h-[550px]" : "h-fit"} max-h-[550px] gap-1 overflow-hidden`}>
      <div className={`relative ${flexDirection1 === "column" ? "h-[33.3%] w-full" : flexDirection2 === "row" ? "h-full w-[33.3%]" : "h-full w-[50%]"}`}>
        <img ref={imgRef1} src={flexDirection1 === "row" && flexDirection2 === "column" ? image1 : lowestAspectRatioImage} className={`h-full w-full object-cover`} alt="media" loading="lazy" onClick={() => openImageViewer(flexDirection1 === "row" && flexDirection2 === "column" ? lowestAspectRatioImageindex : 0)} />
        {showCancelButton && (
          <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(flexDirection1 === "row" && flexDirection2 === "column" ? image1 : lowestAspectRatioImage, flexDirection1 === "row" && flexDirection2 === "column" ? 0 : lowestAspectRatioImageindex)}>
            x
          </div>
        )}
      </div>
      <div className={`flex ${flexDirection2 === "row" ? "w-[66.6%] flex-row" : "w-full flex-col"} gap-1`}>
        <div className={`relative ${flexDirection2 === "row" ? "h-full w-[50%]" : "h-[50%] w-full"}`}>
          <img src={image2} className={`h-full w-full object-cover`} alt="media" loading="lazy" onClick={() => openImageViewer(1)} />
          {showCancelButton && (
            <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(image2, 1)}>
              x
            </div>
          )}
        </div>
        <div className={`relative ${flexDirection2 === "row" ? "h-full w-[50%]" : "h-[50%] w-full"}`}>
          <img ref={imgRef2} src={flexDirection1 === "row" && flexDirection2 === "column" && lowestAspectRatioImage === image3 ? image1 : image3} className={`h-full w-full object-cover`} alt="media" loading="lazy" onClick={() => openImageViewer(flexDirection1 === "row" && flexDirection2 === "column" && lowestAspectRatioImage === image3 ? 0 : 2)} />
          {showCancelButton && (
            <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(flexDirection1 === "row" && flexDirection2 === "column" && lowestAspectRatioImage === image3 ? image1 : image3, flexDirection1 === "row" && flexDirection2 === "column" && lowestAspectRatioImage === image3 ? 0 : 2)}>
              x
            </div>
          )}
        </div>
      </div>
      {isViewerOpen && (
        <div className="z-[99]">
          <ImageViewer disableScroll={true} src={[image1, image2, image3]} currentIndex={currentImage} closeOnClickOutside={true} onClose={closeImageViewer} />
        </div>
      )}
    </div>
  )
}

export default ThreeImages
