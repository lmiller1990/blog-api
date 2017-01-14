//const expect  = require('chai').expect
const request = require('supertest') 
const app     = require('../../app.js')

describe('/index', function() {
  it('loads correctly', function (done) {
    request(app).get('/').expect('Hello World.', done)
  })
})
