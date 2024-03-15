import { useEffect } from "react"
import DisplayMedia from "../../DisplayImages/DisplayMedia"
import { useState } from "react"

const PostBody = ({ description, media, mentions }: { description: string; media: string[]; mentions: string[] }) => {
  const mediaUrls = media.map((item: any) => process.env.REACT_APP_TWEETS_MEDIA_URL + item)

  const [processedMentions, setProcessedMentions] = useState<string[]>([])

  useEffect(() => {
    setProcessedMentions(mentions.map((mention) => `@${mention}`))
  }, [mentions])

  return (
    <div className="min-xs:pl-12">
      <div className="post-text mt-1 ">
        <p >
          {description?.split(" ").map((word, index) => (
            <span key={index} className="">
              {processedMentions.includes(word) ? (
                <a href={`/${word.slice(1)}`} onClick={(e: any) => e.stopPropagation()} className="text-white hover:text-primary">
                  {`${word}`}
                </a>
              ) : word[0] === "#" ? (
                <a dir="ltr" href={`/trending/${word.slice(1)}/diaries`} onClick={(e: any) => e.stopPropagation()} className="text-primary mx-1 hover:underline">
                  {` ${word} `}
                </a>
              ) : word === "<br>" ? (
                <br />
              ) : (
                ` ${word} `
              )}
            </span>
          ))}
        </p>
      </div>

      <div className="post-media mt-3">
        <DisplayMedia mediaUrls={mediaUrls} setMediaUrls={() => {}} margin={1} deleteCallback={() => {}} showCancelButton={false} />
      </div>
    </div>
  )
}

export default PostBody
