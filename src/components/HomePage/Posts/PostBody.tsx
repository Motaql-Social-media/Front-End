import { useEffect } from "react"
import DisplayMedia from "../../DisplayImages/DisplayMedia"
import { useState } from "react"

const PostBody = ({ description, media, mentions }: { description: string; media: string[]; mentions: string[] }) => {
  const mediaUrls = media.map((item: any) => process.env.REACT_APP_TWEETS_MEDIA_URL + item)

  function splitTextAndWords(text: any, mentions: string[]) {
    const mentionRegex = new RegExp(`\b@(${mentions.join("|")})\b|(@(${mentions.join("|")})[.,?!])`, "gi")

    // Split the text into plain text and mention components
    const textFragments = mentions.length > 0 ? text.split(mentionRegex) : [text]
    console.log(textFragments)

    return textFragments
  }

  // useEffect(() => {
  //   const text = "I'm really impressed with these images, thanks @mohameds245 for sharing them"
  //   const words: string[] = ["@mohameds245"]

  //   splitTextAndWords(text, words)
  //   // const { textFragments, matchingWords } = splitTextAndWords(text, words)

  //   // console.log("Text fragments:", textFragments) // Output: ["This is a ", "sample", " text with ", "some", " words."]
  //   // console.log("Matching words:", matchingWords) // Output: ["sample", "text", "some"]
  // }, [description])

  const [processedMentions, setProcessedMentions] = useState<string[]>([])

  useEffect(() => {
    setProcessedMentions(mentions.map((mention) => `@${mention}`))
  }, [mentions])

  return (
    <div className="min-xs:pl-12">
      <div className="post-text mt-1 ">
        <p>
          {description.split(" ").map((word, index) => (
            <span key={index}>
              {processedMentions.includes(word) ? (
                <a href={`/${word.slice(1)}`} onClick={(e: any) => e.stopPropagation()} className="text-white hover:text-primary">
                  {` ${word} `}
                </a>
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
