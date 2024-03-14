import { styles } from "../../styles/styles"
import useCheckAuthentication from "../hooks/useCheckAuthentication"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  useCheckAuthentication()

  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-grow flex-col items-center justify-center gap-5">
      <h1 className="text-6xl font-bold text-red-700 ">Sorry...</h1>
      <p className="text-3xl font-bold text-primary">The page you are looking for doesn't exist</p>
      <button className={`${styles.coloredButton} !h-fit !w-fit !px-5 !py-3 !text-3xl !font-bold`} onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  )
}

export default NotFound
