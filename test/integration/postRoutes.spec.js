const request = require('supertest')
const Bluebird = require('bluebird')
const app = require('../../app')

describe('post routes', function() {
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
      title: 'Single post', content: 'Some content' 
    }).then(function () {
      request(app)
        .get('/posts/1')
        .expect(200, /Single post/)
        .expect(200, /Some content/)
        .end(done)
    })
  })
})
