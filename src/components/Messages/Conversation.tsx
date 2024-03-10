import { Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Conversation = ({ id, isActive, otherContact }: { id: string; isActive: boolean; otherContact: any }) => {
  const navigate = useNavigate()
  return (
    <div
      className="flex cursor-pointer gap-2 border-y  border-darkBorder p-2 hover:bg-darkHover"
      onClick={() => {
        navigate(`/messages/${id}`)
      }}
    >
      <div>
        <Avatar src={process.env.REACT_APP_USERS_MEDIA_URL + otherContact.imageUrl} alt={otherContact.username} />
      </div>
      <div>
        <div className="flex gap-2">
          <div className="text-white">{otherContact.name}</div>
          <div className="text-gray-500">@{otherContact.username}</div>
        </div>
        <div className="text-gray-500">{otherContact.jobtitle}</div>
      </div>
    </div>
  )
}

export default Conversation
