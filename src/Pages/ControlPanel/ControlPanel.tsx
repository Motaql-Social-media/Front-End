import React from "react"
import useCheckAdminAuthentication from "../../components/hooks/useCheckAdminAuthentication"

function ControlPanel() {
  const useAuthentication = useCheckAdminAuthentication()
  return <div></div>
}

export default ControlPanel
