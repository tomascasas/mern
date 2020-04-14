const express = require('express')
const createError = require('http-errors')

const asyncMiddleware = require('../lib/async-middleware')
const Todo = require('../models/todo')

const apiRoutes = express.Router()

apiRoutes.route('/todos').get(asyncMiddleware(async (req, res, next) => {
  try {
    const todos = await Todo.find()
    res.json(todos)
  }
  catch(e) {
    next(createError(500, e))
  }
}))

apiRoutes.route('/todos/:id').get(asyncMiddleware(async ({params: {id: _id}}, res, next) => {
  try {
    const todo = await Todo.findById(_id)
    if(todo) res.json(todo)
    else next(createError(404, `Could not find ${_id}`))
  }
  catch(e) {
    next(createError(500, e))
  }
}))

apiRoutes.route('/todos').post(asyncMiddleware(async ({body}, res, next) => {
  try {
    const todo = new Todo(body),
          savedTodo = await todo.save()
    res.json(savedTodo)
  }
  catch(e) {
    next(createError(500, e))
  }
}))

apiRoutes.route('/todos/:id').put(asyncMiddleware(async ({params: {id: _id}, body}, res, next) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate({_id}, body, {
            new: true
          })
    if(updatedTodo) res.json(updatedTodo)
    else next(createError(404, `Could not find ${_id}`))
  }
  catch(e) {
    next(createError(500, e))
  }
}))

apiRoutes.route('/todos/:id').delete(asyncMiddleware(async ({params: {id: _id}}, res, next) => {
  try {
    const deletedId = await Todo.findOneAndDelete({_id})
    if(deletedId) res.json(null)
    else next(createError(404, `Could not find ${_id}`))
  }
  catch(e) {
    next(createError(500, e))
  }
}))

module.exports = apiRoutes