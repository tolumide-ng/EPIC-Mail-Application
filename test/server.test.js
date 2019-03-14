/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';
import bcrypt from 'bcrypt';
import env from 'dotenv';

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
// const should = chai.should();
chai.use(chaiHttp);

describe('/api/v1/auth/signup', () => {
    it('should not accept null values', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: '',
          firstName: '',
          lastName: '',
          password: '',
        }) 
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message')
          done();
        });
    });

    it('should validate email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 't',
          firstName: 'mosinmiloluwa',
          lastName: 'owoso',
          password: 'password',
        }) 
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('please enter a valid epic email');
          done();
        });
    });

    it('should sign up a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 't@epic.com',
          firstName: 'mosinmiloluwa',
          lastName: 'owoso',
          password: '123456',
        }) 
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('message').eql('Authentication successful!. Welcome mosinmiloluwa');
          done();
        });
    });
  });

  describe('version 2 /api/v1/auth/signup', () => {
    it('version 2 should not accept null values', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: '',
          firstName: '',
          lastName: '',
          password: '',
        }) 
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message')
          done();
        });
    });

    it('version 2 should validate email', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 't',
          firstName: 'mosinmiloluwa',
          lastName: 'owoso',
          password: 'password',
        }) 
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('please enter a valid epic email');
          done();
        });
    });

    it('version 2 should sign up a user', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send({
          email: 't@epic.com',
          firstName: 'mosinmiloluwa',
          lastName: 'owoso',
          password: '123456',
        }) 
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('message').eql('Authentication successful!. Welcome mosinmiloluwa');
          done();
        });
    });
  });

  describe('/api/v1/auth/login', () => {
    it('should not accept null values', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: '',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('email and password are required');
          
          done();
        });
    });
    it('should login a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 't@epic.com',
          password: '123456',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
  });

  // describe('/api/v1/createAMessage', () => {
  //   it('should create a message', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/createAMessage')
  //       .send({
  //         subject: 'test mail',
  //         message: 'test message',
  //         email: 't@epic.com',
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  describe('/api/v1/messages', () => {
    it('should view all recieved messages', (done) => {
      chai.request(app)
        .get('/api/v1/messages')
        .set({'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRAYWIuY29tIiwiaWQiOjEsImlhdCI6MTU1MjQwMDUzOSwiZXhwIjoxNTUyNDg2OTM5fQ.IuKFJMrq-y2CvRrSoUu5YXOdLU5RkuLRGfAzq3hISvQ','Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  /*describe('/api/v1/messages/getAMessage', () => {
    it('should get a message', (done) => {
      chai.request(app)
        .get('/api/v1/messages/getAMessage/1')
        .end((err, res) => {
          if(!res){
          expect(res).to.have.status(404);
        }
          done();
        });
    });
  }); */

  describe('/api/v1/messages/unreadMessagesPerUser', () => {
    it('should display all unread messages', (done) => {
      chai.request(app)
        .get('/api/v1/messages/unreadMessagesPerUser/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('/api/v1/getMessagesSentByAUser', () => {
    it('should display all messages sent by a user', (done) => {
      chai.request(app)
        .get('/api/v1/messages/getMessagesSentByAUser/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('/api/v1/users', () => {
    it('should display a particular user email', (done) => {
      chai.request(app)
        .get('/api/v1/users/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('/api/v1/messages/deleteAMessage', () => {
    it('should delete a message', (done) => {
      chai.request(app)
        .get('/api/v1/messages/deleteAMessage/1')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });