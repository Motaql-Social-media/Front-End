import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import PersonsContainer from "../Person/PersonsContainer"
import NoLikes from "./NoLikes"

const Likes = () => {
  const { id, type } = useParams()
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)

  const [likers, setLikers] = useState([])

  useEffect(() => {
    if (id) {
      API.get(`${type==='diary'?'tweets':'reels'}/${id}/reacters`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          //   console.log(res.data.data.reacters)
          setLikers(res.data.data.reacters)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [id])

  return (
    <>
      {likers.length > 0 && <PersonsContainer people={likers} />}
      {likers.length === 0 && <NoLikes />}
    </>
  )
}

export default Likes
