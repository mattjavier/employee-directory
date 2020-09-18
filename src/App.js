import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6'


const App = () => {

  const [employeeState, setEmployeeState] = useState({
    employees: [],
    columns: [
      {
        Header: 'Employee',
        columns: [
          {
            Header: 'First Name',
            accessor: 'first',
          },
          {
            Header: 'Last Name',
            accessor: 'last'
          }
        ]
      },
      {
        Header: 'Information',
        columns: [
          {
            Header: 'Email',
            accessor: 'email'
          },
          {
            Header: 'Gender',
            accessor: 'gender',
            sortable: false,
          },
          {
            Header: 'City',
            accessor: 'city'
          },
          {
            Header: 'State',
            accessor: 'state',
          },
          {
            Header: 'Country',
            accessor: 'country'
          }
        ]
      }
    ]
  })

  useEffect(() => {
    axios.get('https://randomuser.me/api?results=20')
      .then(({ data }) => {

        let employees = data.results.map(employee => ({
          first: employee.name.first,
          last: employee.name.last,
          email: employee.email,
          gender: employee.gender,
          city: employee.location.city,
          state: employee.location.state,
          country: employee.location.country
        }))

        setEmployeeState({ ...employeeState, employees })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="container">
      <ReactTable columns={employeeState.columns} data={employeeState.employees} filterable />
    </div>
  )
}

export default App