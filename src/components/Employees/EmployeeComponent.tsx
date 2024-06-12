import { Avatar } from "@mui/material"
import React from "react"
import { t } from "i18next"
import EmployeeStateButton from "../General/EmployeeStateButton"

function EmployeeComponents({ employee }: { employee: Employee }) {
  function isoDateToDDMMYYYY(isoDate: string) {
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0") // Add leading zero for single-digit days

    return `${day}/${month}/${year}`
  }

  const [status, setStatus] = React.useState<boolean>(employee.status === "ACTIVATED" ? true : false)

  return (
    <div className="flex gap-3 border-b border-b-darkBorder p-5 hover:bg-darkHover">
      <div>
        <Avatar alt={employee.name} src={`${ employee.imageUrl}`} sx={{ width: 50, height: 50 }} />
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <div className="flex w-full items-center justify-between">
          <div>
            <div className="text-lg">{employee.name}</div>
            <div className="flex w-full gap-1 text-gray-400">
              <div dir="ltr">{employee.phoneNumber}</div>
              {" . "}
              <div>{employee.email}</div>
            </div>
          </div>
          <EmployeeStateButton username={employee.name} id={employee.userId} state={status} setState={setStatus} />
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="text-primary">
            {t("add_date")}
            {" : "}
            {isoDateToDDMMYYYY(employee.createdAt)}
          </div>
          {employee.inActivatedAt && !status && (
            <div className={`${employee.inActivatedAt ? "text-primary" : "text-gray-400"}`}>
              {t("cancelation_date")}
              {" : "}
              {isoDateToDDMMYYYY(employee.inActivatedAt)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponents
