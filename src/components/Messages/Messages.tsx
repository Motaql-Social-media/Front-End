import SubpageNavbar from "../General/SubpageNavbar"
import { useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Widgets from "../Widgets/Widgets"
import { styles } from "../../styles/styles"
import axios from "axios"
import Conversations from "./Conversations"

const Messages = ({ scroll }: { scroll: number }) => {
  const messagesRef = useRef<any>(null)

  useEffect(() => {
    messagesRef.current.scrollTop += scroll
  }, [scroll])

  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)

  const [messages, setMessages] = useState<any[]>([])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  useEffect(() => {
    API.post(`chats`)
      .then((res) => {
        console.log(res.data.data.conversations)
        setMessages(res.data.data.conversations)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={messagesRef} className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="messages" />
        <div className="flex justify-end p-4">
          <button className={`${styles.coloredButton} flex !w-fit items-center justify-center p-4`}>New message</button>
        </div>
        <Conversations conversations={messages} setConversations={setMessages} />
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Messages
