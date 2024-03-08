import { useParams } from "react-router"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PersonsContainer from "../Person/PersonsContainer"

const Followers = () => {
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

  const [followers, setFollowers] = useState([])

  useEffect(() => {
    if (id) {
      API.get(`users/${id}/followers`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          console.log(res.data.data.followers)
          setFollowers(res.data.data.followers)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [id])
  return (
    <div>
      <PersonsContainer people={followers} />
    </div>
  )
}

export default Followers
