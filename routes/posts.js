const express = require('express')
const models = require('../models')
const router = express.Router()

router.get('/', (req, res) => {
  models.Post.findAll().then(function(allPosts) {
    res.json({
      result: allPosts
    })
  })
})

router.get('/:id', (req, res) => {
  models.Post.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  }).then(function(post) {
    res.json({
      result: post
    })
  })
})

router.post('/create', (req, res) => {
  models.Post.create({
    title: req.body.title,
    content: req.body.content
  }).then(function() {
    res.redirect('/')
  })
})

router.get('/edit/:id', (req, res) => {
  models.Post.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  }).then(function(post) {
    res.json({
      result: post
    })
  })
})

router.post('/edit/:id', (req, res) => {
  models.Post.update({
      id: parseInt(req.params.id),
      title: req.body.title,
      content: req.body.content
    }, {
      where: {
        id: parseInt(req.params.id)
      }
    })
    .then(function() {
      res.redirect('/posts/' + req.params.id)
    })
})

module.exports = router
