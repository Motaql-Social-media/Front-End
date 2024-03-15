import { useParams } from "react-router"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PersonsContainer from "../Person/PersonsContainer"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Loading from "../General/Loading"

const Followers = () => {
  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
    },
  })
  const { t } = useTranslation()
  const { tag } = useParams()

  const [id, setId] = useState("")

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchFollowers = () => {
    if (id) {
      API.get(`users/${id}/followers?page=${page}&limit=20`)
        .then((res) => {
          if (res.data.data.followers.length < 20) setFinished(true)
          setLoading(false)
          // console.log(res.data.data.followers)
          setFollowers((prev) => [...prev, ...res.data.data.followers])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    if (tag) {
      API.get(`users/${tag}/profile`)
        .then((res) => {
          setId(res.data.data.user.userId)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [tag])

  const [followers, setFollowers] = useState<any[]>([])

  useEffect(() => {
    fetchFollowers()
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
          {followers.length > 0 && <PersonsContainer people={followers} />}
          {followers.length === 0 && <div className="mt-5 flex h-96 items-center justify-center text-center text-2xl text-2xl font-bold text-primary">{t("no_followers")}</div>}
          {followers.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default Followers
