import { useEffect } from "react"
import DisplayMedia from "../../DisplayImages/DisplayMedia"
import { useState } from "react"
import i18next from "i18next"

const PostBody = ({ description, media, mentions }: { description: string; media: string[]; mentions: string[] }) => {
  const mediaUrls = media.map((item: any) => process.env.REACT_APP_TWEETS_MEDIA_URL + item)

  const [processedMentions, setProcessedMentions] = useState<string[]>([])

  useEffect(() => {
    setProcessedMentions(mentions.map((mention) => `@${mention}`))
  }, [mentions])

  function isArabicChar(char: string): boolean {
    return /[\u0600-\u06FF]/.test(char)
  }

  function hasArabicChars(text: string): boolean {
    return text.split("").some(isArabicChar)
  }

  return (
    <div className="min-xs:pl-12">
      <div className="post-text mt-1 ">
        <p>
          {description?.split(" ").map((word, index) => (
            <span key={index} className=" break-words">
              {processedMentions.includes(word) ? (
                <a dir="ltr" href={`/${word.slice(1)}`} onClick={(e: any) => e.stopPropagation()} className="text-white hover:text-primary">
                  {`${word}`}
                </a>
              ) : word[0] === "#" ? (
                <a href={`/trending/${word.slice(1)}/diaries`} onClick={(e: any) => e.stopPropagation()} className="mx-1 text-primary hover:underline">
                  {` ${!hasArabicChars(word) ? word.slice(1) + word[0] : word[0] + word.slice(1)} `}
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
