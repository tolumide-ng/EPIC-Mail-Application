/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
// const should = chai.should();
chai.use(chaiHttp);

describe('/api/v1/auth/signup', () => {
    it('should sign up a user', () => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 't@a.com',
          firstName: 'mosinmiloluwa',
          lastName: 'owoso',
          password: '1234',
        }) 
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });
  });