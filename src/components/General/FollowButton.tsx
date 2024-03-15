import { useSelector } from "react-redux"
import { styles } from "../../styles/styles"
import { useTranslation } from "react-i18next"
import axios from "axios"

const FollowButton = ({ username, state, setState }: { username: string; state: boolean; setState: any }) => {
  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)
  const { t } = useTranslation()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const handleState = () => {
    API.patch(
      `users/current/toggle-follow/${username}`,
      {},
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((res) => {
        // console.log(res.data)
        setState((prev: boolean) => !prev)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleButtonClick = (e: any) => {
    e.stopPropagation()
    handleState()
  }

  return (
    <div>
      {username !== user.username && (
        <button className={`${styles.coloredButton} !h-8 !w-fit !px-3 hover:bg-white hover:text-primary`} onClick={handleButtonClick}>
          {state ? t("unfollow") : t("follow")}
        </button>
      )}
    </div>
  )
}

export default FollowButton
