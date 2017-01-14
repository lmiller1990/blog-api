const express = require('express')
const models = require('../models')
const router = express.Router()

router.get('/', (req, res) => {
  models.Post.findAll().then(function (allPosts) {
    res.json({
      result: allPosts
    })
  })
})

router.get('/:id', (req, res) => {
  console.log(`Finding post with id ${req.params.id}`)
  models.Post.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  }).then(function (post) {
    res.json({
      result: post
    })
  })
})

router.post('/create', (req, res) => {
  models.Post.create({
    title: req.body.title,
    content: req.body.content
  }).then(function () {
    res.redirect('/')
  }) 
})


module.exports = router
