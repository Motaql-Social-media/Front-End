import SubpageNavbar from "../General/SubpageNavbar"
import { useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Widgets from "../Widgets/Widgets"
import { styles } from "../../styles/styles"
import axios from "axios"
import Conversations from "./Conversations"
import Modal from "@mui/material/Modal"
import Close from "@mui/icons-material/Close"
import SearchComponent from "../Trending/SearchComponent"
import io from "socket.io-client"
import useCheckAuthentication from "../hooks/useCheckAuthentication"

const Messages = ({ scroll }: { scroll: number }) => {
  const messagesRef = useRef<any>(null)

  useCheckAuthentication()

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

  const fetchMessages = () => {
    API.post(`chats`)
      .then((res) => {
        // console.log(res.data.data)
        setMessages(res.data.data.conversations)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Update the window width when the component mounts
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const modalStyle: modalStyleT = {
    position: "absolute",
    borderRadius: "16px",
    backgroundColor: "black",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [socket, setSocket] = useState<any>(null)
  useEffect(() => {
    setSocket(
      io("https://theline.social", {
        path: "/socket.io",
        withCredentials: true,
        extraHeaders: {
          token: userToken,
        },
      })
    )
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Socket connected! from messages")
      })
      socket.on("disconnect", () => {
        console.log("Socket disconnected!")
      })
      socket.on("msg-receive", (payload: Message) => {
        fetchMessages()
      })
    }
  }, [socket])

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={messagesRef} className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="messages" />
        <div className="flex justify-end p-4">
          <button className={`${styles.coloredButton} flex !w-fit items-center justify-center p-4`} onClick={handleOpen}>
            New message
          </button>
        </div>
        <Conversations conversations={messages} setConversations={setMessages} />
      </div>
      {user && <Widgets />}
      <Modal open={open} onClose={handleClose} disableEscapeKeyDown disablePortal>
        <div style={modalStyle} className={`  h-[90%] w-[40%]  rounded-2xl border p-4  dark:border-darkBorder dark:bg-black`}>
          <div className="mb-5 flex items-center gap-5">
            <div className="cursor-pointer rounded-full p-1  text-white hover:bg-darkHover" onClick={handleClose}>
              <Close />
            </div>
            <div className="text-2xl font-semibold text-white">Start New Message</div>

            <div className="flex-grow"></div>
          </div>
          <SearchComponent query="" callback={() => {}} fromMessage={true} />
        </div>
      </Modal>
    </div>
  )
}

export default Messages
