'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const firebaseEnv = require('./firebase.env.json')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIRE_BASE: firebaseEnv
})
