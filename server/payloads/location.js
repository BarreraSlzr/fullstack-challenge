'use strict'

/**
 * Location objects intended for payload's validation
 */
const Joi = require('joi')

const create = Joi.object().keys({
  latitude: Joi.string().required().description('locations\'s latitude'),
  longitude: Joi.string().required().description('locations\'s longitude'),
  location_name: Joi.string().required().description('locations\'s name.'),
  open_time: Joi.string().optional().description('locations\'s opening time.'),
  close_time: Joi.string().optional().description('locations\'s closing time.')
})

const update = Joi.object().keys({
  id: Joi.string().required().description('locations\'s id. Search key.'),
  latitude: Joi.string().description('locations\'s latitude'),
  longitude: Joi.string().description('locations\'s longitude'),
  location_name: Joi.string().description('locations\'s name.'),
  open_time: Joi.string().optional().description('locations\'s opening time.'),
  close_time: Joi.string().optional().description('locations\'s closing time.')
})

const deletion = Joi.object().keys({
  id: Joi.string().required().description('locations\'s id. Search key. This value cannot change and it will be used to soft delete only.')
})

module.exports = {
  create,
  update,
  deletion
}
