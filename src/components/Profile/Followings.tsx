import { useParams } from "react-router"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PersonsContainer from "../Person/PersonsContainer"

const Followings = () => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })
  const { t } = useTranslation()
  const { tag } = useParams()

  const [id, setId] = useState("")

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

  const [followings, setFollowings] = useState([])

  useEffect(() => {
    if (id) {
      API.get(`users/${id}/followings`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          console.log(res.data.data.followings)
          setFollowings(res.data.data.followings)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [id])

  return (
    <div>
      {followings.length > 0 && <PersonsContainer people={followings} />}
      {followings.length === 0 && <div className="mt-5 text-center text-2xl font-bold text-primary">{t("no_followings")}</div>}{" "}
    </div>
  )
}

export default Followings
