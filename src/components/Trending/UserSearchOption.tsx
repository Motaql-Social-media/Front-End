import { Avatar } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import React from "react"

const UserSearchComponent = ({
  option,
  id,
  ...props
}: {
  option: {
    username: string
    name: string
    imageUrl: string
  }
  id: string | undefined
}) => {
  const navigate = useNavigate()

  return (
    <div {...props} key={id} className="flex cursor-pointer p-3 hover:bg-lightHover" onClick={() => navigate(`/${option.username}`)}>
      <Avatar alt={option.username} src={process.env.REACT_APP_USERS_MEDIA_URL + option.imageUrl} sx={{ width: 40, height: 40 }} />
      <div className="ml-3">
        <div className="text-secondary text-sm">{option.name}</div>
        <div className="text-secondary text-sm">@{option.username}</div>
      </div>
    </div>
  )
}

export default UserSearchComponent
