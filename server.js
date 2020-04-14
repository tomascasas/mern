const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')

const connectDB = require('./config/db')
const asyncMiddleware = require('./lib/async-middleware')
const Todo = require('./models/todo')

const todoRoutes = express.Router()
const app = express()
connectDB()

const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())




todoRoutes.route('/todos').get(asyncMiddleware(async (req, res) => {
  try {
    const todos = await Todo.find()
    res.json(todos)
  }
  catch(e) {
    console.error('getAll', e)
    res.status(400).send(e)
  }
}))

todoRoutes.route('/todos/:id').get(asyncMiddleware(async ({params: {id: _id}}, res) => {
  try {
    const todo = await Todo.findById(_id)
    if(todo) res.json(todo)
    else res.status(404).send(`Could not find ${_id}`)
  }
  catch(e) {
    console.error('get', e)
    res.status(404).send(e)
  }
}))

todoRoutes.route('/todos').post(asyncMiddleware(async ({body}, res) => {
  console.log('post', body)
  try {
    const todo = new Todo(body),
          savedTodo = await todo.save()
    res.status(200).json(savedTodo)
  }
  catch(e) {
    console.error('post', e)
    res.status(400).send(e)
  }
}))

todoRoutes.route('/todos/:id').put(asyncMiddleware(async ({params: {id: _id}, body}, res) => {
  console.log('put', body)
  try {
    const updatedTodo = await Todo.findOneAndUpdate({_id}, body, {
            new: true
          })
    if(updatedTodo) res.json(updatedTodo)
    else res.status(404).send(`Could not find ${_id}`)
  }
  catch(e) {
    console.error('put', e)
    res.status(400).send(e)
  }
}))

todoRoutes.route('/todos/:id').delete(asyncMiddleware(async ({params: {id: _id}}, res) => {
  console.log('delete', _id)
  try {
    const deletedId = await Todo.findOneAndDelete({_id})
    if(deletedId) res.status(200).send(null)
    else res.status(404).send(`Could not find ${_id}`)
  }
  catch(e) {
    console.error('delete', e)
    res.status(400).send(e)
  }
}))

app.use('/api', todoRoutes)



app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`)
})
