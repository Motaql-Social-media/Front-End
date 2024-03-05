import { useState, useCallback, useEffect } from "react"

import ImageViewer from "react-simple-image-viewer"
import { useRef } from "react"
import OneImage from "./OneImage"
import TwoImages from "./TwoImages"
import ThreeImages from "./ThreeImages"
import FourImages from "./FourImages"

function DisplayMedia({ mediaUrls, setMediaUrls, margin, showCancelButton, deleteCallback }: { mediaUrls: string[]; setMediaUrls: any; margin: number; showCancelButton: boolean; deleteCallback: any }) {
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
  const [imageLength, setImageLength] = useState(0)
  const [imageWidthsAggregate, setImageWidthsAggregate] = useState(0)
  const [imageHeightsAggregate, setImageHeightsAggregate] = useState(0)
  const [sortedWidths, setSortedWidths] = useState<string[]>([])
  const [sortedHeights, setSortedHeights] = useState<string[]>([])
  const [sortedHeightsNumbers, setSortedHeightsNumbers] = useState<number[]>([])
  const [sortedWeightsNumbers, setSortedWeightsNumbers] = useState<number[]>([])
  const [sortedAspectRatio, setSortedAspectRatio] = useState<string[]>([])
  const [heighestHeight, setHeighestHeight] = useState(0)
  const [lowestHeight, setLowestHeight] = useState(0)
  const [midHeight, setMidHeight] = useState(0)
  const [heighestWidth, setHeighestWidth] = useState(0)
  const [lowestWidth, setLowestWidth] = useState(0)
  const [midWidth, setMidWidth] = useState(0)
  const [widthDiff, setWidthDiff] = useState(0)
  const [heightDiff, setHeightDiff] = useState(0)
  const [oneHaveColumn, setOneHaveColumn] = useState(false)

  useEffect(() => {
    setImageLength(mediaUrls.length)

    setImageWidthsAggregate(
      mediaUrls.reduce((acc, curr) => {
        const img = new Image()
        img.src = curr
        return acc + img.width
      }, 0)
    )

    setImageHeightsAggregate(
      mediaUrls.reduce((acc, curr) => {
        const img = new Image()
        img.src = curr
        return acc + img.height
      }, 0)
    )

    setSortedWidths(
      [...mediaUrls].sort((a, b) => {
        const imgA = new Image()
        imgA.src = a
        const imgB = new Image()
        imgB.src = b
        return imgA.width - imgB.width
      })
    )

    setSortedHeights(
      [...mediaUrls].sort((a, b) => {
        const imgA = new Image()
        imgA.src = a
        const imgB = new Image()
        imgB.src = b
        return imgA.height - imgB.height
      })
    )

    setSortedAspectRatio(
      [...mediaUrls].sort((a, b) => {
        const imgA = new Image()
        imgA.src = a
        const imgB = new Image()
        imgB.src = b
        const aspectRatioA = imgA.width / imgA.height
        const aspectRatioB = imgB.width / imgB.height
        return aspectRatioA - aspectRatioB
      })
    )
  }, [mediaUrls])

  useEffect(() => {
    setSortedHeightsNumbers(
      sortedHeights.map((url) => {
        const img = new Image()
        img.src = url
        return img.height
      })
    )

    setSortedWeightsNumbers(
      sortedWidths.map((url) => {
        const img = new Image()
        img.src = url
        return img.width
      })
    )

    const tmp = new Image()
    tmp.src = sortedHeights[2]
    setHeighestHeight(tmp.height)

    tmp.src = sortedWidths[2]
    setHeighestWidth(tmp.width)

    tmp.src = sortedHeights[0]
    setLowestHeight(tmp.height)

    tmp.src = sortedWidths[0]
    setLowestWidth(tmp.width)

    tmp.src = sortedHeights[1]
    setMidHeight(tmp.height)

    tmp.src = sortedWidths[1]
    setMidWidth(tmp.width)
  }, [sortedHeights, sortedWidths])

  useEffect(() => {
    setWidthDiff(heighestWidth - (lowestWidth + midWidth))
    setHeightDiff(heighestHeight - (lowestHeight + midHeight))
  }, [heighestHeight, lowestHeight, midHeight, heighestWidth, lowestWidth, midWidth])

  useEffect(() => {
    setOneHaveColumn(widthDiff < heightDiff && imageLength === 3)
  }, [widthDiff, heightDiff, imageLength])

  // useEffect(() => {
  //   console.log("widthDiff", widthDiff)

  //   console.log("heightDiff", heightDiff)
  // }, [widthDiff, heightDiff])

  // useEffect(() => {
  //   console.log("oneHaveColumn", oneHaveColumn)
  // }, [oneHaveColumn])

  // useEffect(() => {
  //   console.log(isMobile)
  // }, [])

  const imgRef1 = useRef<HTMLImageElement>(null)
  const imgRef2 = useRef<HTMLImageElement>(null)
  const imagesContainer2 = useRef<HTMLDivElement>(null)
  const imagesContainer3onehavecol = useRef<HTMLDivElement>(null)
  const img3onehavecol = useRef<HTMLDivElement>(null)

  const img1onehavecol = useRef<HTMLImageElement>(null)
  const img2onehavecol = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setImageHeightsAggregate(sortedHeightsNumbers.reduce((acc, curr) => acc + curr, 0))
    setImageWidthsAggregate(sortedWeightsNumbers.reduce((acc, curr) => acc + curr, 0))
  }, [sortedHeightsNumbers, sortedWeightsNumbers])

  useEffect(() => {
    if (imageLength === 2) {
      if (imageWidthsAggregate > imageHeightsAggregate) {
        imagesContainer2.current?.style.setProperty("flex-direction", "column")

        imgRef1.current?.style.setProperty("height", `${Math.round((100 * sortedHeightsNumbers[0]) / imageHeightsAggregate)}%`)
        imgRef2.current?.style.setProperty("height", `${Math.round((100 * sortedHeightsNumbers[1]) / imageHeightsAggregate)}%`)
      } else {
        imgRef1.current?.style.setProperty("width", `${Math.round((100 * sortedWeightsNumbers[0]) / imageWidthsAggregate)}%`)
        imgRef2.current?.style.setProperty("width", `${Math.round((100 * sortedWeightsNumbers[1]) / imageWidthsAggregate)}%`)
      }
    }
    if (imageLength === 3) {
      imagesContainer3onehavecol.current?.style.setProperty("height", heighestHeight + "px")
      img3onehavecol.current?.style.setProperty("height", heighestHeight + "px")
      img1onehavecol.current?.style.setProperty("height", `${Math.round((100 * sortedHeightsNumbers[2]) / imageHeightsAggregate)}%`)
      img2onehavecol.current?.style.setProperty("height", `${Math.round((100 * sortedHeightsNumbers[1]) / imageHeightsAggregate)}%`)
    }
  }, [imageHeightsAggregate, imageWidthsAggregate])

  const handleDeleteMedia = (mediaUrl: any, index: any) => {
    setMediaUrls(mediaUrls.filter((i) => i !== mediaUrl))

    deleteCallback(index)
  }

  return (
    <div dir="ltr" className="overflow-hidden rounded-2xl" onClick={(e: any) => e.stopPropagation()}>
      {imageLength === 1 && <OneImage image={mediaUrls[0]} showCancelButton={showCancelButton} handleDeleteMedia={handleDeleteMedia} />}
      {imageLength === 2 && <TwoImages image1={mediaUrls[0]} image2={mediaUrls[1]} showCancelButton={showCancelButton} handleDeleteMedia={handleDeleteMedia} />}
      {imageLength === 3 && <ThreeImages image1={mediaUrls[0]} image2={mediaUrls[1]} image3={mediaUrls[2]} showCancelButton={showCancelButton} handleDeleteMedia={handleDeleteMedia} />}

      {imageLength === 4 && <FourImages image1={mediaUrls[0]} image2={mediaUrls[1]} image3={mediaUrls[2]} image4={mediaUrls[3]} showCancelButton={showCancelButton} handleDeleteMedia={handleDeleteMedia} />}
    </div>
  )
}

export default DisplayMedia
