const request = require('supertest')
const Bluebird = require('bluebird')
const app = require('../../app')
const expect = require('chai').expect

describe('/posts', function() {
  before(function() {
    return require('../../models').sequelize.sync()
  })

  beforeEach(function() {
    this.models = require('../../models')

    return Bluebird.all([
      this.models.Post.destroy({
        truncate: true
      })
    ])
  })

  it('returns a list of all posts', function(done) {
    this.models.Post.bulkCreate([{
      title: 'Post 1',
      content: 'Content 1'
    }, {
      title: 'Post 2',
      content: 'Content 2'
    }]).then(function() {
      request(app)
        .get('/posts/')
        .expect(200, /Post 1/)
        .expect(200, /Post 2/)
        .expect(200, /Content 2/)
        .end(done)
    })
  })

  it('returns a post using the :id param', function(done) {
    this.models.Post.create({
      title: 'Single post',
      content: 'Some content'
    }).then(function() {
      request(app)
        .get('/posts/1')
        .expect(200, /Single post/)
        .expect(200, /Some content/)
        .end(done)
    })
  })

  it('returns a post by id', function(done) {
    this.models.Post.create({
      title: 'Existing post'
    }).then(function() {
      request(app)
        .get('/posts/edit/1')
        .expect(200, /Existing post/)
        .end(done)
    })
  })

  it('updates an existing user', function(done) {
    const self = this
    this.models.Post.create({
        title: 'Old title'
      })
      .then(function() {
        request(app)
          .post('/posts/edit/1')
          .type('form')
          .set('Accept', /application\/json/)
          .send({
            title: "New title"
          })
          .end(function(err, res) {
            self.models.Post.findAll({
              where: {
                title: "New title"
              }
            }).then(function(allPosts) {
              expect(allPosts.length).to.equal(1)
              expect(allPosts[0].title).to.equal("New title")
              expect(res.headers.location).to.equal("/posts/1")
              done()
            })
          })
      })
  })

  it('creates a user', function(done) {
    const self = this
    request(app)
      .post('/posts/create')
      .type('form')
      .set('Accept', /application\/json/)
      .send({
        title: 'New post',
        content: 'New post content'
      })
      .end(function(err, res) {
        self.models.Post.findAll({
          where: {
            id: 1
          }
        }).then(function(allPosts) {
          expect(allPosts.length).to.equal(1)
          expect(allPosts[0].title).to.equal("New post")
          done()
        })
      })
  })
})
