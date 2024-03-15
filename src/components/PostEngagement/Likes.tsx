import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import PersonsContainer from "../Person/PersonsContainer"
import NoLikes from "./NoLikes"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Loading from "../General/Loading"

const Likes = () => {
  const { id, type } = useParams()
  const userToken = useSelector((state: any) => state.user.token)
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
    },
  })

  const [likers, setLikers] = useState<any[]>([])

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchLikers = () => {
    if (id) {
      API.get(`${type === "diary" ? "tweets" : "reels"}/${id}/reacters?page=${page}&limit=20`)
        .then((res) => {
          //   console.log(res.data.data.reacters)
          setLoading(false)
          if (res.data.data.reacters.length < 20) setFinished(true)

          setLikers((prev) => [...prev, ...res.data.data.reacters])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    fetchLikers()
  }, [id, page])

  const handleFetchMore = () => {
    if (!finished) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div>
          {likers.length > 0 && <PersonsContainer people={likers} />}
          {likers.length === 0 && <NoLikes />}
          {likers.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default Likes
