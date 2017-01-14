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
  console.log(`Finding post with id ${req.params.id}`)
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
  console.log('Body is:', req.body)
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
  console.log('id is', req.params.id)
  models.Post.update({
      id: _id  
    }, {
      where: {
        id: _id
      }
    })
    .then(function() {
      //m.Post.findAll({ where: { id: _id } }).then(function(p) { console.log('new',p) })
      res.redirect('/posts/' + req.params.id)
    })
})

module.exports = router
