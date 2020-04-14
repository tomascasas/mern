import React, {useState} from 'react'
import jsonFetch from 'lib/json-fetch'

const getInitialState = () => ({
  description: '',
  responsible: '',
  priority:'',
  completed: false
})

export default () => {
  const [{
          description,
          responsible,
          priority,
          completed
        }, setTodo] = useState(getInitialState()),

        handleInputChange = ({target: {name, value}}) => setTodo(todo => ({
          ...todo,
          [name]: value
        })),

        handleSubmit = async (e) => {
          e.preventDefault()
          try {
            await jsonFetch('http://localhost:4000/api/todos', {
              method: 'POST',
              body: JSON.stringify({
                description,
                responsible,
                priority,
                completed
              })
            })
            setTodo(getInitialState())
          }
          catch(e) {
            alert(e)
          }
        }

  return (
    <div style={{marginTop: 10}}>
      <h3>Create New Todo</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label htmlFor="description">Description: </label>
          <input  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="responsible">Responsible: </label>
          <input  type="text" 
                  name="responsible"
                  id="responsible"
                  className="form-control"
                  value={responsible}
                  onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
              <input  className="form-check-input" 
                      type="radio" 
                      name="priority" 
                      id="priorityLow" 
                      value="Low"
                      checked={priority === 'Low'} 
                      onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="priorityLow">Low</label>
          </div>
          <div className="form-check form-check-inline">
            <input  className="form-check-input" 
                    type="radio" 
                    name="priority" 
                    id="priorityMedium" 
                    value="Medium" 
                    checked={priority === 'Medium'} 
                    onChange={handleInputChange} />
            <label className="form-check-label" htmlFor="priorityMedium">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input  className="form-check-input" 
                    type="radio" 
                    name="priority" 
                    id="priorityHigh" 
                    value="High" 
                    checked={priority === 'High'} 
                    onChange={handleInputChange} />
            <label className="form-check-label" htmlFor="priorityHigh">High</label>
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Todo" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}
