import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import jsonFetch from 'lib/json-fetch'

const strikeThrough = contents => (
  <s>
    {contents}
  </s>
)

export default () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    (async () => {
      try {
        setTodos(await jsonFetch('http://localhost:4000/api/todos'))
      }
      catch(e) {
        alert(e)
      }
    })()
  }, [])

  return (
    <div>
      <h3>Todos List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }} >
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(({_id, description, responsible, priority, completed}, i) => {
            return (
              <tr key={i}>
                <td>{completed ? strikeThrough(description) : description}</td>
                <td>{completed ? strikeThrough(responsible) : responsible}</td>
                <td>{completed ? strikeThrough(priority) : priority}</td>
                <td className="text-center">
                    <Link to={`/edit/${_id}`}>Edit</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
