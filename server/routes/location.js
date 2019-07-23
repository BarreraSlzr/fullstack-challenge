'use strict'
const locationController = require('../controllers/location')
const locationDocs = require('../documentation/location')
const locationPayloads = require('../payloads/location')

module.exports = [
  {
    method: 'GET',
    path: '/api/locations',
    config: {
      description: 'Gives you all locations stored by the user.',
      notes: 'This endpoint will return a list of all records stored.',
      tags: ['api', 'findAll', 'get', 'locations'],
      plugins: locationDocs.locations
    },
    handler: locationController.getLocations
  },
  {
    method: 'PUT',
    path: '/api/locations',
    config: {
      description: 'Update locations modified by the user.',
      notes: 'This endpoint will return a the modified location made by a user.',
      tags: ['api', 'update', 'put', 'locations'],
      plugins: locationDocs.locations,
      validate: {
        payload: locationPayloads.update
      }
    },
    handler: locationController.updateLocations
  },
  {
    method: 'POST',
    path: '/api/locations',
    config: {
      description: 'Create a new location stored by a user.',
      notes: 'This endpoint will store a new location made by a user.',
      tags: ['api', 'create', 'post', 'locations'],
      plugins: locationDocs.locations,
      validate: {
        payload: locationPayloads.create
      }
    },
    handler: locationController.storeLocations
  },
  {
    method: 'DELETE',
    path: '/api/locations',
    config: {
      description: 'Soft deletion of a given location sent by the user.',
      notes: 'This endpoint will soft delete a location sent by a user. We do not want to remove the real information from database',
      tags: ['api', 'delete', 'soft-delete', 'locations'],
      plugins: locationDocs.locations,
      validate: {
        payload: locationPayloads.deletion
      }
    },
    handler: locationController.deleteLocation
  }
]
