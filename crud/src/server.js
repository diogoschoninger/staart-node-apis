import express from 'express'
import users from './routes.js'

const app = express()

app.use(express.json())

app.use('/users', users)

app.use('*', (_req, res) => {
  res.status(404).send({ message: "Invalid endpoint" })
})

app.listen(3333, () => console.log('Server started.'))
