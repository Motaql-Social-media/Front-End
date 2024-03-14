import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import PersonsContainer from "../Person/PersonsContainer"
import NoReposts from "./NoReposts"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Loading from "../General/Loading"

const Reposts = () => {
  const { id, type } = useParams()
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)

  const [retweeters, setRetweeters] = useState<any[]>([])

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchReposts = () => {
    if (id) {
      API.get(`${type !== "reel" ? "tweets" : "reels"}/${id}/${type !== "reel" ? "retweeters" : "rereelers"}?page${page}&limit=20`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          console.log(res.data.data)
          if ((type !== "reel" && res.data.data.retweeters.length < 20) || (type === "reel" && res.data.data.rereelers.length < 20)) setFinished(true)
          setLoading(false)
          if (type === "reel") setRetweeters((prev) => [...prev, ...res.data.data.rereelers])
          else setRetweeters((prev) => [...prev, ...res.data.data.retweeters])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    fetchReposts()
  }, [id, page])

  const handleFetchMore = () => {
    if (!finished) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <>
      {loading&&<Loading />}
      {!loading && (
        <div>
          {retweeters.length > 0 && <PersonsContainer people={retweeters} />}
          {retweeters.length === 0 && <NoReposts />}
          {retweeters.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default Reposts
