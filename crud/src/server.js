import express from 'express'

import errorHandler from './middlewares/error.js'
import users from './routes.js'

const app = express()

app.use(express.json())

app.use('/users', users)

app.use(errorHandler())

app.use('*', (_req, res) => {
  res.status(404).send({ message: "Invalid endpoint" })
})

app.listen(3333, () => console.log('Server started.'))
