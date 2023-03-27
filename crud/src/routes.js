import { Router } from 'express'
import asyncErrorHandler from './middlewares/async-error.js'

const router = Router()

router
  .post('/', asyncErrorHandler((_req, res) => res.status(204).send()))
  .get('/', asyncErrorHandler((_req, res) => res.status(204).send()))
  .get('/:id', asyncErrorHandler((_req, res) => res.status(204).send()))
  .put('/:id', asyncErrorHandler((_req, res) => res.status(204).send()))
  .delete('/:id', asyncErrorHandler((_req, res) => res.status(204).send()))

export default router
