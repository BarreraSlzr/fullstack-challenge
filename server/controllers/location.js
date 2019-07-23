'use strict'

const locationService = require('../services/location')
const Boom = require('boom')

module.exports = {
  async getLocations () {
    try {
      return await locationService.getLocations()
    } catch (error) {
      return Boom.failedDependency(error)
    }
  },
  async storeLocations ({payload}) {
    try {
      return await locationService.createLocation(payload)
    } catch (error) {
      return Boom.badRequest(error)
    }
  },
  async updateLocations ({ payload }) {
    try {
      return await locationService.updateLocation(payload)
    } catch (error) {
      return Boom.badRequest(error)
    }
  },
  async deleteLocation ({ payload: { id } }) {
    try {
      return await locationService.deleteLocation(id)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
}
