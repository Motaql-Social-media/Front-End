import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"
import { Avatar } from "@mui/material"
import { t } from "i18next"

const MentionSearch = ({ username, callback }: { username: string | undefined; callback: any }) => {
  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  const [people, setPeople] = useState<any[]>([])

  useEffect(() => {
    if (username && username.length > 0) {
      API.get(`users/search?nameorusername=${username}&page=1&count=10`)
        .then((res) => {
          console.log(res.data.data.users)
          setPeople(res.data.data.users)
        })
        .catch((error) => {
          setPeople([])
          if (error.response && error.response.status !== 404) {
            console.error(error)
          }
        })
    }
  }, [username])

  return (
    <div className="max-h-[500px] w-[300px] overflow-hidden overflow-y-scroll rounded-2xl border border-primary bg-black">
      {people &&
        people.length > 0 &&
        people.map((person) => (
          <div
            key={person.userId}
            className="flex cursor-pointer gap-4 px-5 py-3 hover:bg-darkHover"
            onClick={() => {
              callback(person.username)
            }}
          >
            <Avatar alt={person.username} src={  person.imageUrl} sx={{ width: 40, height: 40 }} />
            <div>
              <div className="text-primary text-sm">{person.name}</div>
              <div className="text-primary text-sm">@{person.username}</div>
            </div>
          </div>
        ))}
      {people && people.length === 0 && <div className="p-3 text-center text-primary">{t("no_users")}</div>}
    </div>
  )
}

export default MentionSearch
