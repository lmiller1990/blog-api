const models    = require('./models')
const Sequelize = require('sequelize')
const path      = require('path')
const env       = process.env.NODE_ENV || 'development'
const config    = require(__dirname + '/config/config.json')[env]
const utils     = require(__dirname + '/utils/databaseUtils.js')
const express   = require('express')

const sequelize = new Sequelize(config.database, config.username, config.password, config);

//models.sequelize.sync()

utils.authenticate(sequelize)

models.posts.findAll()
  .then = posts => console.log('Selected all posts:', posts)

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World.')
})

app.listen(3000, () => {
  console.log('App started on port 3000.')
})

