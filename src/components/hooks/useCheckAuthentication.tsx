import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const useCheckAuthentication = () => {
  const user = useSelector((state: any) => state.user.user)
  const navigate = useNavigate()
  return useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user])
}

export default useCheckAuthentication
