'use strict'

const ENV_CONF = process.env.NODE_ENV || 'development'
const config = require(`./environment/${ENV_CONF}`)

module.exports = config
