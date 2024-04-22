import React from "react"
import EmployeeComponent from "./EmployeeComponent"

function EmployeesContainer({ employees }: { employees: Employee[] }) {
  return (
    <>
      {employees.map((employee) => (
        <div key={employee.userId}>
          <EmployeeComponent employee={employee} />
        </div>
      ))}
    </>
  )
}

export default EmployeesContainer
