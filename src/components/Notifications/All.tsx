import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Notification from "./Notification"
import { useDispatch } from "react-redux"
import { resetCount } from "../../store/NotificationSlice"
import io from "socket.io-client"
import { useContext } from "react"
import { SocketContext } from "../../App"

const All = () => {
  const { socket } = useContext(SocketContext)

  const userToken = useSelector((state: any) => state.user.token)
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  const [notifications, setNotifications] = useState<Notification[]>([])
  useEffect(() => {
    API.get(`users/current/notifications`)
      .then((res) => {
        console.log(res.data.data.notifications.notifications)
        setNotifications(res.data.data.notifications.notifications)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const dispatch = useDispatch()

  useEffect(() => {
    API.patch("users/current/notifications/mark-all-seen")
      .then((res) => {
        console.log(res)
        dispatch(resetCount())
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on("notification-receive", (payload: Notification) => {
        setNotifications((prev: any) => [payload, ...prev])
        console.log(payload)
      })
    }
  }, [socket])

  return (
    <div>
      {notifications &&
        notifications.length > 0 &&
        notifications.map((n: any) => (
          <div key={n.notificationId}>
            <Notification content={n.content} createdAt={n.createdAt} isSeen={n.isSeen} metadata={n.metadata} notificationFrom={n.notificationFrom} notificationId={n.notificationId} type={n.type} />
          </div>
        ))}
    </div>
  )
}

export default All
