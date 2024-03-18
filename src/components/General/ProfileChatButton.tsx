import { useSelector } from "react-redux"
import SendIcon from "@mui/icons-material/Send"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ProfileChatButton = ({ tag }: { tag: any }) => {
  const user = useSelector((state: any) => state.user.user)

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  const navigate = useNavigate()

  const handleClick = () => {
    API.get(`chats`)
      .then((res) => {
        const l = res.data.data.conversations.filter((conv: any) => conv.otherContact.username === tag)
        console.log(l)
        if (l.length !== 0) {
          navigate(`/messages/${l[0].conversationId}`)
        } else {
          API.post(`chats/start-chat`, {
            username: tag,
          })
            .then((res) => {
              navigate(`/messages/${res.data.data.conversation.conversationId}`)
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      {user?.username !== tag && (
        <div onClick={handleClick} className="justifiy-center flex cursor-pointer items-center rounded-full bg-primary py-2 pl-3 pr-2 hover:bg-primaryHover">
          <SendIcon />
        </div>
      )}
    </div>
  )
}
export default ProfileChatButton
