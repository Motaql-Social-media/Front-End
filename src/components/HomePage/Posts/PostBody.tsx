import { useEffect } from "react"
import DisplayMedia from "../../DisplayImages/DisplayMedia"
import { useState } from "react"
import { t } from "i18next"
import { useRef } from "react"

const PostBody = ({ description, media, mentions, inPostPage }: { description: string; media: string[]; mentions: string[]; inPostPage: boolean }) => {
  const mediaUrls = media

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

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleShowMore = () => {
    setIsExpanded(!isExpanded)
  }

  const pRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const pElement = pRef.current
    if (pElement) {
      const isOverflowed = pElement.offsetHeight < pElement.scrollHeight
      if (isOverflowed) {
        toggleShowMore()
      }
    }
  }, [])

  return (
    <div className="min-xs:pl-12">
      <div className="post-text mt-1 ">
        <p ref={pRef} className={`${inPostPage ? "" : "max-h-[310px] overflow-hidden"} `}>
          {description?.split(" ").map((word, index) => (
            <span key={index} className="break-words">
              {processedMentions.includes(word) ? (
                <a dir="ltr" href={`/${word.slice(1)}`} onClick={(e: any) => e.stopPropagation()} className="text-white hover:text-primary">
                  {`${word}`}
                </a>
              ) : word[0] === "#" ? (
                <a href={`/trending/${word.slice(1)}/diaries`} onClick={(e: any) => e.stopPropagation()} className="mx-1 text-primary hover:underline">
                  {`${!hasArabicChars(word) ? word.slice(1) + word[0] : word[0] + word.slice(1)}`}
                </a>
              ) : word === "<br>" ? (
                <br />
              ) : (
                ` ${word} `
              )}
            </span>
          ))}
        </p>
        {isExpanded && <div className="text-primary hover:underline">{t("show_more")}</div>}
      </div>

      <div className="post-media mt-3">
        <DisplayMedia mediaUrls={mediaUrls} setMediaUrls={() => {}} margin={1} deleteCallback={() => {}} showCancelButton={false} />
      </div>
    </div>
  )
}

export default PostBody
