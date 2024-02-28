import { Skeleton } from "@mui/material"
import { useState, useEffect, useRef } from "react"

const ReelBody = ({ media }: { media: string }) => {
  const handleVideoClick = (e: any) => {
    e.stopPropagation()
  }

  const [isLoading, setIsLoading] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setIsLoading(false)
    }

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
      }
    }
  }, [videoRef.current])

  return (
    <div className={`flex w-[90%] ${isLoading ? "justify-center " : " justify-end"} pl-5 pt-5`}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={"80%"}
        height={600}
        sx={{
          display: isLoading ? "block" : "none",
          borderRadius: "30px",
          backgroundColor: "#3b3b3b",
          "::after": {
            background: "linear-gradient(to right, transparent, #4a4a4a, transparent) !important",
          },
        }}
      />
      <video ref={videoRef} controls className={`h-[600px] w-full rounded-2xl ${isLoading ? "hidden" : ""}`} src={media} onClick={handleVideoClick} />
    </div>
  )
}

export default ReelBody
