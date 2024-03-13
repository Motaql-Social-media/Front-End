import { Avatar } from "@mui/material"
import i18next from "i18next"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { openMessage } from "../../store/MessageSlice"

const Conversation = ({ id, isActive, otherContact, unseenCount }: { id: string; isActive: boolean; otherContact: any; unseenCount: number }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div
      className="relative flex cursor-pointer gap-2  border-y border-darkBorder p-2 hover:bg-darkHover"
      onClick={() => {
        dispatch(openMessage())
        navigate(`/messages/${id}`)
      }}
    >
      <div>
        <Avatar src={otherContact.imageUrl.split(":")[0] === "https" ? otherContact.imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + otherContact.imageUrl} alt={otherContact.username} />
      </div>
      <div>
        <div className="flex gap-2">
          <div className="text-white">{otherContact.name}</div>
          <div className="text-gray-500">@{otherContact.username}</div>
        </div>
        <div className="text-gray-500">{otherContact.jobtitle}</div>
      </div>
      {unseenCount > 0 && <div className={`absolute ${i18next.language === "en" ? "right-5 " : "left-5 "} top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-sm text-black`}>{unseenCount}</div>}{" "}
    </div>
  )
}

export default Conversation
