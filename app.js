const mysql     = require('mysql2')
const models    = require('./models')
const Sequelize = require('sequelize')
const path      = require('path')
const basename  = path.basename(module.filename)
const env       = process.env.NODE_ENV || 'development'
const config    = require(__dirname + '/config/config.json')[env]
const utils     = require(__dirname + '/utils/databaseUtils.js')

const sequelize = new Sequelize(config.database, config.username, config.password, config);

models.sequelize.sync()

sequelize.authenticate()
  .then((err)  => console.log('Sucessfully connected.')) 
  .catch((err) => console.log('Error:', err))

utils.authenticate(sequelize)

models.posts.findAll()
  .then = posts => console.log('Selected all posts:', posts)


