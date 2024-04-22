import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const useCheckAdminAuthentication = () => {
  const cnu = useSelector((state: any) => state.cnu.cnu)
  const navigate = useNavigate()
  return useEffect(() => {
    if (!cnu) {
      navigate("/admin_landing")
    }
  }, [cnu])
}

export default useCheckAdminAuthentication
