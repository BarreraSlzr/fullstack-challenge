'use strict'
const Hapi = require('hapi')
const HapiSwagger = require('hapi-swagger')
const Boom = require('boom')
const Inert = require('inert')
const Vision = require('vision')
const locationRoutes = require('./routes/location')
const isProduction = process.env.NODE_ENV === 'production';

(async () => {
  const server = await new Hapi.Server({
    host: 'localhost',
    port: process.env.PORT || 4040,
    routes: {
      cors: { // need to add cors in order to make the enpoints available for the frontend project
        origin: ['*'],
        headers: ['Accept', 'Content-Type'],
        additionalHeaders: ['X-Requested-With']
      },
      validate: {
        failAction: async (request, h, err) => {
          if (isProduction) {
            // In production,log a limited error
            console.error('ValidationError:', err.message)
            throw Boom.badRequest(`Invalid request payload input`)
          } else {
            // In development return the entire log error
            console.error(err)
            throw err
          }
        }
      }
    }
  })

  // Swagger documentation UI
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'LMB API Documentation',
          version: '29.08.18'
        }
      }
    }
  ])

  try {
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
  } catch (err) {
    console.log(err)
  }

  // Server route handler
  server.route(locationRoutes)
})()
