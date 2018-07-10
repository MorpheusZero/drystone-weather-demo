const request = require('supertest');
const AppServer = require('../../../dist/app.server.js').AppServer;

const app = AppServer.initialize();
 
request(app)
  .get('/countries')
  .expect('Content-Type', /json/)
  .expect(200)
  .end((err, res) => {
    if (err) throw err;
  });