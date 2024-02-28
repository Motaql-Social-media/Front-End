import React, { useState, useCallback } from "react"
import ImageViewer from "react-simple-image-viewer"

const OneImage = ({ image, showCancelButton, handleDeleteMedia }: { image: string; showCancelButton: boolean; handleDeleteMedia: any }) => {
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
    <div dir="ltr">
      <div className="relative max-h-[500px] overflow-hidden">
        <img src={image} className=" h-full max-h-[550px] w-full object-cover" alt="media" loading="lazy" onClick={() => openImageViewer(0)} />
        {showCancelButton && (
          <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(image, 0)}>
            x
          </div>
        )}
      </div>
      {isViewerOpen && (
        <div className="z-[99]">
          <ImageViewer disableScroll={true} src={[image]} currentIndex={currentImage} closeOnClickOutside={true} onClose={closeImageViewer} />
        </div>
      )}
    </div>
  )
}

export default OneImage
