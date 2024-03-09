import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import WidgetsTrendsContainer from "./WidgetTrendsContainer"
import { useNavigate } from "react-router-dom"
import { t } from "i18next"

const WidgetsTrends = () => {
  const userToken = useSelector((state: any) => state.user.token)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const [trends, setTrends] = useState([])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  useEffect(() => {
    API.get("tags/trending", {
      params: {
        page: 1,
        count: 5,
      },
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        // console.log(res.data.data.tags)
        setTrends(res.data.data.tags)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className=" m-5 rounded-xl bg-[#f7f9f9] dark:bg-[#16181c]">
      <div className="p-3 text-start text-lg font-semibold">{t("widgets_trends")}</div>
      <WidgetsTrendsContainer data={trends} loading={loading} />
      <div
        className={`rounded-xl rounded-t-none p-3 text-start text-primary  hover:cursor-pointer hover:bg-lightHover dark:hover:bg-[#292d34]`}
        onClick={() => {
          navigate("/trending")
        }}
      >
        {t("show_more")}
      </div>
    </div>
  )
}

export default WidgetsTrends
