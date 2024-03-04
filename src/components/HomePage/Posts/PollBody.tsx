import { useEffect, useState } from "react"
import { styles } from "../../../styles/styles"
import PollOptionResult from "./PollOptionResult"
import axios from "axios"
import { useSelector } from "react-redux"

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
      setTimeRemaining("Poll has ended")
      return
    }

    const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60))

    let message
    if (days > 0) {
      message = `${days} days left`
    } else if (hours > 0) {
      message = `${hours} hours left`
    } else {
      message = `${minutes} minutes left`
    }

    setTimeRemaining(message)
  }

  useEffect(() => {
    getTimeRemaining()
  }, [poll])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)

  const [polled, setPolled] = useState(false)
  const [polledIdx, setPolledIdx] = useState(-1)

  const handleVote = (optionIdx: number) => {
    // API.patch(
    //   `tweets/${id}/toggle-vote`,
    //   {
    //     optionIdx,
    //   },
    //   {
    //     headers: {
    //       authorization: "Bearer " + userToken,
    //     },
    //   }
    // )
    //   .then((res) => {
    //     console.log(res)
    //     setPolledIdx(optionIdx)
    //     setPolled(true)
    //   })
    //   .catch((err) => console.log(err))
    setPolledIdx(optionIdx)
    setPolled(true)
  }

  return (
    <div className="min-xs:pl-12">
      <div className="post-text mt-1 ">
        <p>
          {poll.question.split(" ").map((word: any, index: number) => (
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
      {!polled && (
        <div>
          {poll.options.map((p: any, index: number) => (
            <button key={index} className={`${styles.normalButton} !border-primary hover:dark:bg-darkHover`} onClick={() => handleVote(index)}>
              {p.text}
            </button>
          ))}
        </div>
      )}
      {polled && (
        <div>
          {poll.options.map((p: any, index: number) => (
            <PollOptionResult option={p.text} percentage={poll.polled ? (p.votesCount * 100) / poll.totalVotesCount : ((p.votesCount + (index === polledIdx)) * 100) / (poll.totalVotesCount + 1)} key={index} />
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <div className="pl-8 text-primary">{poll.polled ? poll.totalVotesCount : poll.totalVotesCount + 1} votes</div>
        <div className="text-primary">{timeRemaining}</div>
      </div>
    </div>
  )
}

export default PollBody
