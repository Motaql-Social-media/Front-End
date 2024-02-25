import { useState, useCallback, useEffect } from "react"

import ImageViewer from "react-simple-image-viewer"

function DisplayMedia({ mediaUrls, mediaTypes, margin, handleDeleteMedia, showCancelButton }: { mediaUrls: string[]; mediaTypes: string[]; margin: number; handleDeleteMedia: (url: string, index: number) => void; showCancelButton: boolean }) {
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

  const imageLength = mediaUrls.length
  const imageWidthsAggregate = mediaUrls.reduce((acc, curr) => {
    const img = new Image()
    img.src = curr
    return acc + img.width
  }, 0)
  const imageHeightsAggregate = mediaUrls.reduce((acc, curr) => {
    const img = new Image()
    img.src = curr
    return acc + img.height
  }, 0)

  const sortedWidths = [...mediaUrls].sort((a, b) => {
    const imgA = new Image()
    imgA.src = a
    const imgB = new Image()
    imgB.src = b
    return imgA.width - imgB.width
  })

  const sortedHeights = [...mediaUrls].sort((a, b) => {
    const imgA = new Image()
    imgA.src = a
    const imgB = new Image()
    imgB.src = b
    return imgA.height - imgB.height
  })

  const sortedAspectRatio = [...mediaUrls].sort((a, b) => {
    const imgA = new Image()
    imgA.src = a
    const imgB = new Image()
    imgB.src = b
    const aspectRatioA = imgA.width / imgA.height
    const aspectRatioB = imgB.width / imgB.height
    return aspectRatioA - aspectRatioB
  })

  const heighestWidth = new Image()
  heighestWidth.src = sortedWidths[2]
  const lowestWidth = new Image()
  lowestWidth.src = sortedWidths[0]
  const midWidth = new Image()
  midWidth.src = sortedWidths[1]
  const widthDiff = heighestWidth.width - (lowestWidth.width + midWidth.width)

  const heighestHeight = new Image()
  heighestHeight.src = sortedHeights[2]
  const lowestHeight = new Image()
  lowestHeight.src = sortedHeights[0]
  const midHeight = new Image()
  midHeight.src = sortedHeights[1]
  const heightDiff = heighestHeight.height - (lowestHeight.height + midHeight.height)

  // useEffect(() => {
  //   console.log("widthDiff", widthDiff)

  //   console.log("heightDiff", heightDiff)
  // }, [widthDiff, heightDiff])
  const oneHaveColumn = widthDiff < heightDiff && imageLength === 3

  // useEffect(() => {
  //   console.log("oneHaveColumn", oneHaveColumn)
  // }, [oneHaveColumn])

  // useEffect(() => {
  //   console.log(isMobile)
  // }, [])

  return (
    <div dir="ltr">
      {imageLength === 1 && <img src={mediaUrls[0]} className="h-full w-full" alt="media" loading="lazy" onClick={() => openImageViewer(0)} />}
      {imageLength === 2 && (
        <div className={`flex ${imageWidthsAggregate > imageHeightsAggregate ? "flex-col" : ""} gap-1`}>
          <img src={mediaUrls[0]} className={`${imageWidthsAggregate > imageHeightsAggregate ? "w-full" : " w-[50%]"}`} alt="media" loading="lazy" onClick={() => openImageViewer(0)} />
          <img src={mediaUrls[1]} className={`${imageWidthsAggregate > imageHeightsAggregate ? "w-full" : " w-[50%]"}`} alt="media" loading="lazy" onClick={() => openImageViewer(1)} />
        </div>
      )}
      {oneHaveColumn && (
        <div className={`flex h-[${heighestHeight.height}] max-h-[400px] gap-1`}>
          <img src={sortedAspectRatio[0]} alt="media" loading="lazy" className=" w-[50%]" onClick={() => openImageViewer(0)} />
          <div className="flex flex-col gap-1">
            <img src={sortedAspectRatio[2]} alt="media" loading="lazy" className="h-[50%] " onClick={() => openImageViewer(0)} />
            <img src={sortedAspectRatio[1]} alt="media" loading="lazy" className="h-[50%] " onClick={() => openImageViewer(0)} />
          </div>
        </div>
      )}
      {!oneHaveColumn && imageLength === 3 && (
        <div className="flex h-[500px] flex-col gap-1">
          <img src={sortedWidths[2]} loading="lazy" alt="media" className="h-[40%] w-full" onClick={() => openImageViewer(2)} />
          <div className="flex h-[60%] gap-1">
            <img src={sortedWidths[0]} loading="lazy" alt="media" className="h-full w-[50%]" onClick={() => openImageViewer(0)} />
            <img src={sortedWidths[1]} loading="lazy" alt="media" className="h-full w-[50%]" onClick={() => openImageViewer(1)} />
          </div>
        </div>
      )}
      {imageLength === 4 && (
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <img src={mediaUrls[0]} className="w-[50%]" alt="media" loading="lazy" onClick={() => openImageViewer(0)} />
            <img src={mediaUrls[1]} className="w-[50%]" alt="media" loading="lazy" onClick={() => openImageViewer(1)} />
          </div>
          <div className="flex gap-1">
            <img src={mediaUrls[2]} className="w-[50%]" alt="media" loading="lazy" onClick={() => openImageViewer(2)} />
            <img src={mediaUrls[3]} className="w-[50%]" alt="media" loading="lazy" onClick={() => openImageViewer(3)} />
          </div>
        </div>
      )}

      {isViewerOpen && (
        <div className="z-[99]">
          <ImageViewer disableScroll={true} src={mediaUrls} currentIndex={currentImage} closeOnClickOutside={true} onClose={closeImageViewer} />
        </div>
      )}
    </div>
  )
}

export default DisplayMedia
