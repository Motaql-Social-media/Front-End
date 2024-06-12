import { Avatar } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import React from "react"
import axios from "axios"
import { useSelector } from "react-redux"

const UserSearchComponent = ({
  option,
  id,
  fromMessage,
}: {
  option: {
    username: string
    name: string
    imageUrl: string
  }
  fromMessage: boolean
  id: string | undefined
}) => {
  const navigate = useNavigate()

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
    },
  })

  const handleClick = () => {
    if (!fromMessage) navigate(`/${option.username}`)
    else {
      API.post(`chats/start-chat`, {
        username: option.username,
      })
        .then((res) => {
          navigate(`/messages/${res.data.data.conversation.conversationId}`)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div key={id} className="flex cursor-pointer p-3 hover:bg-darkHover" onClick={handleClick}>
      <Avatar alt={option.username} src={ option.imageUrl} sx={{ width: 40, height: 40 }} />
      <div className="ml-3">
        <div className="text-secondary text-sm">{option.name}</div>
        <div className="text-secondary text-sm">@{option.username}</div>
      </div>
    </div>
  )
}

export default UserSearchComponent
