import { Router } from 'express'

import user from './controller.js'

const router = Router()

router
  .post('/', user.new)
  .get('/', user.list)
  .get('/:id', user.get)
  .put('/:id', user.update)
  .delete('/:id', user.delete)

export default router
