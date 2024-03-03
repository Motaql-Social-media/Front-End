import { Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FollowButton from "../General/FollowButton"
import { useState } from "react"

const Person = ({ name, username, bio, jobtitle, followersCount, followingsCount, imageUrl, isBlocked, isFollowed, isMuted }: { name: string; username: string; bio: string; jobtitle: string; followersCount: number; followingsCount: number; imageUrl: string; isBlocked: boolean; isFollowed: boolean; isMuted: boolean }) => {
  const navigate = useNavigate()

  const [state, setState] = useState(isFollowed)

  return (
    <div className="flex items-center gap-2 p-3 hover:dark:bg-darkHover" onClick={() => navigate(`/${username}`)}>
      <div>
        <Avatar alt={name} src={`${process.env.REACT_APP_USERS_MEDIA_URL}${imageUrl.split("/").pop()}`} sx={{ width: 40, height: 40 }} />
      </div>
      <div className="flex flex-col items-start ">
        <div className=" flex cursor-pointer items-center gap-2 ">
          <div className=" font-bold hover:underline">{name}</div>
          <div className="text-sm text-gray-500">{jobtitle}</div>
        </div>
        <div className="cursor-pointer text-sm text-gray-500">@{username}</div>
        <div className="text-sm dark:text-white">{bio}</div>
      </div>
      <div className="flex-grow"></div>
      <div>
        <FollowButton username={username} state={state} setState={setState} />
      </div>
    </div>
  )
}

export default Person
