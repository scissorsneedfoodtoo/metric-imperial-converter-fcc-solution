/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       If additional tests are added, keep them at the very end
*
*
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit.toLowerCase(), 'l'); // Ignore case
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end((err, res) => {
          assert.strictEqual(res.status, 400);
          assert.strictEqual(res.body.error, "Invalid unit");
          done();
        });
      });

      test('Convert 3a16kg', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3a16kg'})
          .end((err, res) =>  {
            assert.strictEqual(res.body.error, 'Invalid number');
            done();
          });
      });
      
      test('Convert 1a4kkg (invalid number and unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '1a4kkg'})
        .end((err, res) => {
          assert.strictEqual(res.status, 400);
          assert.strictEqual(res.body.error, "Invalid number and unit");
          done();
        });
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.strictEqual(res.body.initNum, 1);
          assert.strictEqual(res.body.initUnit.toLowerCase(), 'kg'); // Ignore case
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.strictEqual(res.body.returnUnit, 'lbs');
          done();
        });
      });
      
    });

  });

});
