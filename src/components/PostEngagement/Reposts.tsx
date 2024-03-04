import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import PersonsContainer from "../Person/PersonsContainer"
import NoReposts from "./NoReposts"

const Reposts = () => {
  const { id,type } = useParams()
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)

  const [retweeters, setRetweeters] = useState([])

  useEffect(() => {
    if (id) {
      API.get(`${type!=='reel'?'tweets':'reels'}/${id}/${type!=='reel'?'retweeters':'rereelers'}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          //   console.log(res.data.data.retweeters)
          setRetweeters(res.data.data.retweeters)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [id])
  return (
    <>
      {retweeters.length > 0 && <PersonsContainer people={retweeters} />}
      {retweeters.length === 0 && <NoReposts />}
    </>
  )
}

export default Reposts
