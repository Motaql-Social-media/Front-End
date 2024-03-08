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

  const [polled, setPolled] = useState(poll.votedOptionId !== undefined ? true : false)
  const [polledId, setPolledId] = useState(poll.votedOptionId !== undefined ? poll.votedOptionId : -1)
  const [totalVotes, setTotalVotes] = useState(poll.totalVotesCount)
  const [optionsVotesCount, setOptionsVotesCount] = useState(poll.options.map((option: any) => option.votesCount))

  // useEffect(() => {
  //   console.log(poll.votedOption !== undefined ? true : false)
  // }, [])

  // useEffect(() => {
  //   console.log(poll.votedOption)
  //   if (poll.VotedOption) {
  //     setPolledIdx(poll.VotedOption)
  //     console.log("H")
  //     setPolled(true)
  //   } else {
  //     // setPolled(false)
  //   }
  // }, [])

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
        console.log(res)
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
      {!polled && timeRemaining !== "Poll has ended" && (
        <div>
          {poll.options.map((p: any, index: number) => (
            <button key={index} className={`${styles.normalButton} !border-primary hover:dark:bg-darkHover`} onClick={(e: any) => handleVote(e, p.optionId, index)}>
              {p.text}
            </button>
          ))}
        </div>
      )}
      {(polled || timeRemaining === "Poll has ended") && (
        <div>
          {poll.options.map((p: any, index: number) => (
            <PollOptionResult option={p.text} percentage={(optionsVotesCount[index] * 100) / totalVotes} key={index} />
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <div className="pl-8 text-primary">{totalVotes} votes</div>
        <div className="text-primary">{timeRemaining}</div>
      </div>
    </div>
  )
}

export default PollBody
