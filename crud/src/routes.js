import { Router } from 'express'

const router = Router()

router
  .post('/', (_req, res) => res.status(204).send())
  .get('/', (_req, res) => res.status(204).send())
  .get('/:id', (_req, res) => res.status(204).send())
  .put('/:id', (_req, res) => res.status(204).send())
  .delete('/:id', (_req, res) => res.status(204).send())

export default router
