import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import TodoList from 'todo/list'
import EditTodo from 'todo/edit'
import CreateTodo from 'todo/create'
import logo from 'logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
            <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
          </a>
          <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={TodoList} />
        <Route path="/edit/:id"  component={EditTodo} />
        <Route path="/create"  component={CreateTodo} />
      </div>
    </Router>
  )
}

export default App;
