import Joi from 'joi'

export default {
  create: {
    body: Joi.object({
      username: Joi.string().email().required(),
      name: Joi.string().regex(/^[A-Za-z]+(\s?[A-Za-z])*$/).required(),
      password: Joi.string().min(5).max(40).required()
    })
  },
  
  get: {
    params: {
      id: Joi.number().required()
    }
  },
  
  update: {
    body: Joi.object({
      name: Joi.string().regex(/^[A-Za-z]+(\s?[A-Za-z])*$/).required(),
      password: Joi.string().min(5).max(40).required()
    }).or('name', 'password'),
    params: {
      id: Joi.number().required()
    }
  },
  
  delete: {
    params: {
      id: Joi.number().required()
    }
  }
}
