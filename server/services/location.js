'use strict'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const shortid = require('shortid')

// For demo purposes, load the mock data to have some initial records
const defaultLocations = require('../test/mocks/location.mock')
db.defaults(defaultLocations).write()

const getLocations = () => {
  return db.get('locations').filter({ is_deleted: 0 }).value()
}

/**
 * @param {Object} payload location object which is going to be stored on database
 */
const createLocation = (payload) => {
  return db.get('locations')
    .push(Object.assign({}, payload, { id: shortid.generate(), is_deleted: 0 }))
    .write()
}

/**
 * @param {Object} payload location object which is going to be updated on database
 */
const updateLocation = (payload) => {
  return db.get('locations')
    .find({ id: payload.id })
    .assign(payload)
    .write()
}

/**
 * @param {*} payload location object which is going to be used to soft delete
 */
const deleteLocation = (id) => {
  return db.get('locations')
    .find({ id: id })
    .assign({ is_deleted: 1 })
    .write()
}

module.exports = {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation
}
