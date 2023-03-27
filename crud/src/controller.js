import asyncErrorHandler from './middlewares/async-error.js'
import UsersRepository from './repository/in-memory.js'

const repository = UsersRepository()

const notFound = { message: 'Resource not found.' }

const user = {
  new: asyncErrorHandler(async (req, res) => {
    const user = req.body

    const inserted = await repository.insert(user)

    res.status(201)
      .header('Location', `/api/v1/users/${inserted.id}`)
      .send(inserted)
  }),

  list: asyncErrorHandler(async (_req, res) => {
    const users = await repository.list()
    
    res.status(200).send(users)
  }),

  get: asyncErrorHandler(async (req, res) => {
    const id = parseInt(req.params.id)
  
    const registered = await repository.get(id)
  
    if (!registered)
      return res.status(404).send(notFound)
  
    res.status(200).send(user)
  }),

  update: asyncErrorHandler(async (req, res) => {
    const id = parseInt(req.params.id)
  
    const body = req.body
  
    const registered = await repository.get(id)
  
    if (!registered)
      return res.status(404).send(notFound)
  
    const user = { ...body, id }
  
    const updated = await repository.update(user)
  
    res.status(200).send(updated)
  }),

  delete: asyncErrorHandler(async (req, res) => {
    const id = parseInt(req.params.id)
  
    const registered = await repository.get(id)
  
    if (!registered)
      return res.status(404).send(notFound)
  
    await repository.del(id)
    
    res.status(204).send()
  })
}

export default user
