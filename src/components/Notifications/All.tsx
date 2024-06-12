import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Notification from "./Notification"
import { useDispatch } from "react-redux"
import { resetCount } from "../../store/NotificationSlice"
import io from "socket.io-client"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import i18next, { t } from "i18next"
import Loading from "../General/Loading"

const All = () => {
  const userToken = useSelector((state: any) => state.user.token)
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
      "accept-language": i18next.language,
    },
  })

  const [socket, setSocket] = useState<any>(null)

  const [notificationsPage, setNotificationsPage] = useState<number>(1)
  const [finishedNotifications, setFinishedNotifications] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setSocket(
      io("https://thelinechat.com", {
        path: "/socket.io",
        withCredentials: true,
        extraHeaders: {
          token: userToken,
        },
      })
    )
  }, [])

  const fetchNotifications = () => {
    API.get(`users/current/notifications?page=${notificationsPage}&limit=20`)
      .then((res) => {
        // console.log(res.data.data.notifications.notifications)
        setLoading(false)
        if (res.data.data.notifications.notifications.length < 20) {
          setFinishedNotifications(true)
        }
        setNotifications((prev) => [...prev, ...res.data.data.notifications.notifications])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [notifications, setNotifications] = useState<Notification[]>([])
  useEffect(() => {
    fetchNotifications()
  }, [notificationsPage])

  const dispatch = useDispatch()

  useEffect(() => {
    API.patch("users/current/notifications/mark-all-seen")
      .then((res) => {
        // console.log(res)
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
        // console.log(payload)
      })
      socket.on("notification-deleted", (payload: any) => {
        setNotifications((prev: any) => prev.filter((n: any) => n.notificationId !== payload.notificationId))
      })
    }
  }, [socket])

  const handleFetchMore = () => {
    if (!finishedNotifications) {
      setNotificationsPage((prev) => prev + 1)
    }
  }

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div>
          {notifications &&
            notifications.length > 0 &&
            notifications.map((n: any) => (
              <div key={n.notificationId}>
                <Notification content={n.content} createdAt={n.createdAt} isSeen={n.isSeen} metadata={n.metadata} notificationFrom={n.notificationFrom} notificationId={n.notificationId} type={n.type} />
              </div>
            ))}
          {notifications.length === 0 && <div className="flex h-96 items-center justify-center text-2xl font-bold text-primary">{t("no_notifications")}</div>}
          {notifications.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default All
