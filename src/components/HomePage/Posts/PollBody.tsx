import { useEffect, useState } from "react"
import { styles } from "../../../styles/styles"
import PollOptionResult from "./PollOptionResult"
import axios from "axios"
import { useSelector } from "react-redux"
import { t } from "i18next"

const PollBody = ({ poll, mentions, id }: { poll: any; mentions: string[]; id: string }) => {
  const [processedMentions, setProcessedMentions] = useState<string[]>([])

  useEffect(() => {
    setProcessedMentions(mentions.map((mention) => `@${mention}`))
  }, [mentions])

  const [timeRemaining, setTimeRemaining] = useState<string>("")

  const getTimeRemaining = () => {
    const then = new Date(poll.length)
    const now = new Date()

    const timeDiffMs = then.getTime() - now.getTime()

    const hasPassed = timeDiffMs < 0

    // If date has passed, return boolean true
    if (hasPassed) {
      setTimeRemaining(t("poll_ended"))
      return
    }

    const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60))

    let message
    if (days > 0) {
      message = `${days} ${t("days")} ${t("left")}`
    } else if (hours > 0) {
      message = `${hours} ${t("hours")} ${t("left")}`
    } else {
      message = `${minutes} ${t("minutes")} ${t("left")}`
    }

    setTimeRemaining(message)
  }

  useEffect(() => {
    getTimeRemaining()
  }, [poll])

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
    },
  })

  const [polled, setPolled] = useState(poll.votedOptionId !== undefined ? true : false)
  const [polledId, setPolledId] = useState(poll.votedOptionId !== undefined ? poll.votedOptionId : -1)
  const [totalVotes, setTotalVotes] = useState(poll.totalVotesCount)
  const [optionsVotesCount, setOptionsVotesCount] = useState(poll.options.map((option: any) => option.votesCount))

  const handleVote = (e: any, optionId: number, index: number) => {
    e.stopPropagation()
    API.patch(
      `tweets/${poll.pollId}/toggle-vote/${optionId}`,
      {},
      {
        headers: {
          authorization: "Bearer " + userToken,
        },
      }
    )
      .then((res) => {
        // console.log(res)
        setPolledId(optionId)
        setTotalVotes((prev: number) => prev + 1)
        setOptionsVotesCount((prev: any) => {
          const newVotes = [...prev]
          newVotes[index]++
          return newVotes
        })
        setPolled(true)
      })
      .catch((err) => console.log(err))
    // setPolledIdx(optionIdx)
    // setPolled(true)
  }

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
          {poll.question?.split(" ").map((word: any, index: number) => (
            <span key={index}>
              {processedMentions.includes(word) ? (
                <a href={`/${word.slice(1)}`} onClick={(e: any) => e.stopPropagation()} className="text-white hover:text-primary">
                  {` ${word} `}
                </a>
              ) : word[0] === "#" ? (
                <a dir="ltr" href={`/trending/${word.slice(1)}/diaries`} onClick={(e: any) => e.stopPropagation()} className="mx-1 text-primary hover:underline">
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
      {!polled && timeRemaining !== t("poll_ended") && (
        <div>
          {poll.options.map((p: any, index: number) => (
            <button key={index} className={`${styles.normalButton} !border-primary hover:dark:bg-darkHover`} onClick={(e: any) => handleVote(e, p.optionId, index)}>
              {p.text}
            </button>
          ))}
        </div>
      )}
      {(polled || timeRemaining === t("poll_ended")) && (
        <div>
          {poll.options.map((p: any, index: number) => (
            <PollOptionResult option={p.text} percentage={(optionsVotesCount[index] * 100) / totalVotes} key={index} />
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <div className="pl-8 text-primary">
          {totalVotes} {t("votes")}
        </div>
        <div className="text-primary">{timeRemaining}</div>
      </div>
    </div>
  )
}

export default PollBody
