import { Skeleton } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"

const ReelBody = ({ muted, setMuted, media, content, mentions, displayReel }: { muted: boolean; setMuted: any; media: string; content: string; mentions: string[]; displayReel: boolean }) => {
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

  const mediaUrl = (process.env.REACT_APP_REELS_MEDIA_URL || "") + media

  const [processedMentions, setProcessedMentions] = useState<string[]>([])

  useEffect(() => {
    setProcessedMentions(mentions.map((mention) => `@${mention}`))
  }, [mentions])

  useEffect(() => {
    let timeoutId: any

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          clearTimeout(timeoutId)
          timeoutId = setTimeout(() => {
            videoRef.current?.play()
          }, 100)
        } else {
          clearTimeout(timeoutId)
          videoRef.current?.pause()
        }
      },
      { threshold: 0.7 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
      clearTimeout(timeoutId)
    }
  }, [videoRef])

  const handleVolumeChange = (event: any) => {
    const video = event.target
    if (video.muted) {
      setMuted(false)
    } else {
      setMuted(true)
    }
  }

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (videoRef.current.paused) videoRef.current.play()
      else videoRef.current.pause()
    }
  }

  return (
    <div className="w-full">
      <div className="ml-5 mt-1 ">
        <p>
          {content?.split(" ").map((word, index) => {
            return (
              <span key={index}>
                {processedMentions.includes(word) ? (
                  <a href={`/${word.slice(1)}`} onClick={(e: any) => e.stopPropagation()} className="text-white hover:text-primary">
                    {` ${word} `}
                  </a>
                ) : word[0] === "#" ? (
                  <a dir="ltr" href={`/trending/${word.slice(1)}/reels`} onClick={(e: any) => e.stopPropagation()} className="text-primary hover:underline">
                    {" " + word + " "}
                  </a>
                ) : word === "<br>" ? (
                  <br />
                ) : (
                  ` ${word} `
                )}
              </span>
            )
          })}
        </p>
      </div>
      {displayReel && (
        <div className={` pl-5 pt-5`}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={"100%"}
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
          <div className="relative w-full">
            <video ref={videoRef} onClickCapture={handleClick} onVolumeChange={handleVolumeChange} muted={!muted} autoPlay className={`h-[600px] w-full  ${isLoading ? "hidden" : ""}`} src={mediaUrl} onClick={handleVideoClick} />
            {!muted && (
              <div
                className="absolute bottom-[1%] right-0 text-primary"
                onClick={(e: any) => {
                  e.stopPropagation()
                  setMuted(true)
                }}
              >
                <VolumeOffIcon />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReelBody
