import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Avatar } from "@mui/material"
import Widgets from "../../components/Widgets/Widgets"
import CheckIcon from "@mui/icons-material/Check"
import seen from "../../assets/images/seen.png"
import SendIcon from "@mui/icons-material/Send"
import io from "socket.io-client"
import i18next from "i18next"
import ArrowBack from "@mui/icons-material/ArrowBack"
import ArrowForward from "@mui/icons-material/ArrowForward"
import { t } from "i18next"
import Loading from "../../components/General/Loading"

const Message = ({ scroll }: { scroll: number }) => {
  const messageRef = useRef<any>(null)

  useEffect(() => {
    messageRef.current.scrollTop += scroll
  }, [scroll])

  const { id } = useParams()

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  const [messages, setMessages] = useState<any[]>([])

  const [otherContact, setOtherContact] = useState<any>({})

  const [loading, setLoading] = useState(true)

  const [isBlockingMe, setIsBlockingMe] = useState(false)

  useEffect(() => {
    API.get(`chats/${id}/history`)
      .then((res) => {
        // console.log(res.data.data)
        setLoading(false)
        setOtherContact(res.data.data.otherContact)
        setMessages(res.data.data.messages)
        setIsBlockingMe(res.data.data.isBlockedByOtherContact)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const user = useSelector((state: any) => state.user.user)

  function formatDate(dateString: string) {
    const date = new Date(dateString)

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    }).format(date)
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
        console.log("Socket connected! from message")
      })
      socket.on("disconnect", () => {
        console.log("Socket disconnected!")
      })
    }
  }, [socket])

  useEffect(() => {
    if (socket && otherContact) {
      //   console.log(id, otherContact.userId)
      socket.emit("chat-opened", {
        conversationId: id,
        contactId: otherContact.userId,
      })
    }
  }, [otherContact, socket])

  const [userEntered, setUserEntered] = useState(false)

  useEffect(() => {
    if (socket) {
      socket.on("msg-redirect", (payload: Message) => {
        // console.log(payload)
        setMessages((prev) => [...prev, payload])
      })
      socket.on("msg-receive", (payload: Message) => {
        setMessages((prev) => [...prev, payload])
      })
      socket.on("status-of-contact", (payload: any) => {
        if (payload.inConversation) {
          setUserEntered(true)
        }
      })
    }

    return () => {
      if (socket) {
        // console.log("Chat closed!")
        socket.emit("chat-closed", {
          conversationId: id,
          contactId: otherContact.userId,
        })
        socket.disconnect()
        // console.log(socket)
      }
    }
  }, [socket])

  useEffect(() => {
    if (userEntered) {
      //   console.log("user entered")
      const newMessages = messages.map((m) => {
        const t = { ...m, isSeen: true }
        return t
      })
      //   console.log("messages", messages)
      //   console.log(newMessages)
      setMessages(newMessages)
      setUserEntered(false)
    }
  }, [userEntered])

  const [text, setText] = useState("")

  const messagesRef = useRef<any>(null)

  const handleSendMessage = () => {
    if (socket) {
      socket.emit(
        "msg-send",
        {
          receiverId: otherContact.userId,
          conversationId: id,
          text: text,
        },
        (res: any) => console.log(res)
      )

      setText("")
    }
  }

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages])

  const navigate = useNavigate()

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = currentScrollPos > prevScrollPos
      setPrevScrollPos(currentScrollPos)

      // Check if scrolling down
      if (isScrollingDown) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollPos])

  const [isVisible, setIsVisible] = useState(true)

  const handleBack = () => {
    navigate("/messages")
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={messageRef} className=" ml-0 mr-1 flex w-full max-w-[620px] shrink-0 flex-grow flex-col border  border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:h-[89vh] max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div className={`flex items-center justify-start gap-7 ${i18next.language === "en" ? "pl-2" : "pr-2"}  max-[540px]:hidden`}>
          <div onClick={handleBack} className="cursor-pointer">
            {i18next.language === "en" && <ArrowBack fontSize="small" />}
            {i18next.language === "ar" && <ArrowForward fontSize="small" />}
          </div>
          <div
            className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
            onClick={() => {
              window.location.reload()
            }}
          >
            {t(otherContact.name)}
          </div>
        </div>{" "}
        <div className="flex flex-col items-center gap-2 ">
          <div className="flex w-full flex-col items-center border-b border-darkBorder py-3 hover:bg-darkHover" onClick={() => navigate(`/${otherContact.username}`)}>
            <Avatar src={otherContact.imageUrl?.split(":")[0] === "https" ? otherContact.imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + otherContact.imageUrl} alt={otherContact.name} sx={{ width: 100, height: 100 }} />
            <div className="text-white">{otherContact.name}</div>
            <div className="text-gray-500">@{otherContact.username}</div>
            <div className="flex gap-2 text-gray-500">
              <div> {otherContact.jobtitle}</div>
              <div>
                - {otherContact.followersCount} {t("followers")}
              </div>
            </div>
          </div>
        </div>
        {loading && <Loading />}
        {!loading && (
          <div ref={messagesRef} className=" no-scrollbar flex h-full w-full flex-col overflow-y-scroll">
            {messages.map((m, index) => {
              return (
                <div key={index} className={`flex flex-col ${m.isFromMe ? "items-end" : "items-start "} h-full gap-2 p-4`}>
                  <div className={`rounded-xl ${m.isFromMe ? "bg-primary " : "bg-gray-400"} p-2 text-black`}>{m.text}</div>
                  <div className={`flex items-center gap-3 ${m.isFromMe ? "" : "flex-row-reverse"}`}>
                    <div className="text-gray-500">{formatDate(m.createdAt)}</div>
                    {m.isSeen ? (
                      <img src={seen} alt="seen" className={`h-[15px] w-[18px] ${!m.isFromMe ? "hidden" : ""}`} />
                    ) : (
                      <div className={`${!m.isFromMe ? "hidden" : ""}`}>
                        <CheckIcon
                          sx={{
                            width: 20,
                            height: 20,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <div className="flex w-full items-center justify-center">
          {isBlockingMe && (
            <div className="mb-5 py-2 text-red-600">
              {t("you_are_blocked")}
              {otherContact.username}
            </div>
          )}
          {!isBlockingMe && (
            <div dir="ltr" className=" flex w-[95%] items-center justify-center overflow-hidden rounded-2xl border-t border-t-darkBorder bg-darkHover">
              <input value={text} onChange={(e: any) => setText(e.target.value)} type="text" placeholder="Type a message" className="flex-grow bg-darkHover p-4 text-white" />
              <div className="cursor-pointer border-l border-l-darkBorder p-2 text-primary" onClick={handleSendMessage}>
                <SendIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Message
