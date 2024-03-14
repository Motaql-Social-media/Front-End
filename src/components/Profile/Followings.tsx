import { useParams } from "react-router"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PersonsContainer from "../Person/PersonsContainer"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Loading from "../General/Loading"

const Followings = () => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })
  const { t } = useTranslation()
  const { tag } = useParams()

  const [id, setId] = useState("")

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchFollowings = () => {
    if (id) {
      API.get(`users/${id}/followings?page=${page}&limit=20`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          if (res.data.data.followings.length < 20) setFinished(true)
          setLoading(false)

          console.log(res.data.data.followings)
          setFollowings((prev) => [...prev, ...res.data.data.followings])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    if (tag) {
      API.get(`/users/${tag}/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          setId(res.data.data.user.userId)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [tag])

  const userToken = useSelector((state: any) => state.user.token)

  const [followings, setFollowings] = useState<any[]>([])

  useEffect(() => {
    fetchFollowings()
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
          {followings.length > 0 && <PersonsContainer people={followings} />}
          {followings.length === 0 && <div className="mt-5 flex h-96 items-center justify-center text-center text-2xl font-bold text-primary">{t("no_followings")}</div>}
          {followings.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default Followings
