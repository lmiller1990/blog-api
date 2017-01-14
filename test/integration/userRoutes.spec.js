const request  = require('supertest')
const Bluebird = require('bluebird')
const app      = require('../../app')

describe('post routes', function() {
  before(function () {
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

  it('returns a post if there is one', function(done) {
    this.models.Post.create({
      title: 'Fake post title', content: 'Fake content'
    }).then(function() {
      request(app)
        .get('/posts/')
        .expect(200, /Fake post title/)
        .expect(200, /Fake content/)
        .end(done)
    })
  })
})
