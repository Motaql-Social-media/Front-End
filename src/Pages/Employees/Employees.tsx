import React from "react"
import useCheckAdminAuthentication from "../../components/hooks/useCheckAdminAuthentication"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import EmployeesContainer from "../../components/Employees/EmployeesContainer"
import { useSelector } from "react-redux"
import axios from "axios"
import { TextField } from "@mui/material"
import { t } from "i18next"
import { styles } from "../../styles/styles"

function Employees() {
  useCheckAdminAuthentication()

  const EmployeesRef = React.useRef<HTMLDivElement>(null)

  const cnt = useSelector((state: any) => state.cnu.cnt)
  const cnu = useSelector((state: any) => state.cnu.cnu)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${cnt}`,
      "accept-language": cnu,
    },
  })

  const [employees, setEmployees] = React.useState<Employee[]>([])

  React.useEffect(() => {
    API.get("/employees")
      .then((res) => {
        console.log(res.data.data.employees)
        setEmployees(res.data.data.employees)
        setAllEmployees(res.data.data.employees)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const [searchQuery, setSearchQuery] = React.useState("")

  const [allEmployees, setAllEmployees] = React.useState<Employee[]>([])

  const handleSearch = () => {
    API.get(`/employees/search?nameoremail=${searchQuery}`)
      .then((res) => {
        setEmployees(res.data.data.employees)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleEnterKeyPress = (e: any) => {
    if (searchQuery.length < 2) setEmployees(allEmployees)
    else if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={EmployeesRef} className="no-scrollbar ml-0  w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="employees" />
        <div className="mt-3">
          <TextField
            label={t("employee_search")}
            variant="outlined"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            inputProps={{
              onKeyDown: handleEnterKeyPress,
            }}
            sx={styles.textField}
          />
        </div>

        <EmployeesContainer employees={employees} />
      </div>
    </div>
  )
}

export default Employees
