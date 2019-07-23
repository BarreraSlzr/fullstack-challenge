'use strict'
/**
 * Enpoint objects intended for documentation on api/locations
 */

const locations = {
  'hapi-swagger': {
    responses: {
      '400': {
        'description': 'BadRequest'
      },
      '422': {
        'description': 'Unprocessable Entity'
      }
    },
    payloadType: 'form'
  }
}

module.exports = {
  locations
}
