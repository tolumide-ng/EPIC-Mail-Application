/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server1';

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('/api/v1/users/signup', () => {
    it('should sign up a user', (done) => {
      chai.request(server)
        .post('/api/v1/users/signup')
        .send({
          email: 't@a.com',
          firstName: 'mosinmiloluwa',
          lastName: 'owoso',
          password: '1234',
        })
        .end((err, res) => {
          expect(res.body.email).to.be.equal('t@a.com');
          expect(res.body.firstName).to.be.equal('mosinmiloluwa');
          expect(res.body.lastName).to.be.equal('owoso');
          expect(res.body.password).to.be.equal('1234');
          expect(res).to.have.status(200);
          done();
        });
    });
  });