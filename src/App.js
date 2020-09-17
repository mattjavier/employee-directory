import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Table from './components/Table'

const App = () => {

  const [employeeState, setEmployeeState] = useState({
    employees: []
  })

  useEffect(() => {
    axios.get('https://randomuser.me/api?results=20')
      .then(({ data }) => {
        setEmployeeState({ ...employeeState, employees: data.results })
      })
      .catch(err => console.error(err))
  }, [])

  const data = employeeState.employees
  const columns = useMemo(
    () => [
      {
        Header: 'Employee',
        columns: [
          {
            Header: 'First Name',
            accessor: 'name.first',
          },
          {
            Header: 'Last Name',
            accessor: 'name.last'
          }
        ]
      },
    ],
    []
  )

  console.log(data)
  return (
    <>
      <Table columns={columns} data={data} />
    </>
  )
}

export default App