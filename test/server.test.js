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
let v1token,v2token;
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

  describe('version 2 /api/v2/auth/signup', () => {
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
          email: 'b@epic.com',
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
          v1token = res.body.data.token;
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
  });

  describe('version 2 /api/v2/auth/login', () => {
    it('version 2 should not accept null values', (done) => {
      chai.request(app)
        .post('/api/v2/auth/login')
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
    it('version 2 should login a user', (done) => {
      chai.request(app)
        .post('/api/v2/auth/login')
        .send({
          email: 't@epic.com',
          password: '123456',
        })
        .end((err, res) => {
          v2token = res.body.data.token;
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
  });

  describe('/api/v1/messages', () => {
    it('should not accept null message', (done) => {
      chai.request(app)
        .post('/api/v1/messages')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .send({
          subject: 'w',
          message: '',
          email: 'a@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('A message is required');
          done();
        });
    });

    it('should not accept null subject', (done) => {
      chai.request(app)
        .post('/api/v1/messages')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .send({
          subject: '',
          message: 'test message',
          email: 'a@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('A subject is required');
          done();
        });
    });

    it('should not accept invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/messages')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .send({
          subject: 'test mail',
          message: 'test message',
          email: 'a@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('the email does not exist');
          done();
        });
    });

    it('should create a message', (done) => {
      chai.request(app)
        .post('/api/v1/messages')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .send({
          subject: 'test mail',
          message: 'test message',
          email: 't@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('should not create a message without token', (done) => {
      chai.request(app)
        .post('/api/v1/messages')
        .send({
          subject: 'test mail',
          message: 'test message',
          email: 't@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('/api/v2/messages', () => {
    it('version 2 should not accept null message', (done) => {
      chai.request(app)
        .post('/api/v2/messages')
        .set({'Authorization':v2token,'Accept':'application/json'})
        .send({
          subject: 'w',
          message: '',
          email: 'a@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('A message is required');
          done();
        });
    });

    it('version 2 should not accept null subject', (done) => {
      chai.request(app)
        .post('/api/v2/messages')
        .set({'Authorization':v2token,'Accept':'application/json'})
        .send({
          subject: '',
          message: 'test message',
          email: 'a@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('A subject is required');
          done();
        });
    });

    it('version 2 should not accept invalid email', (done) => {
      chai.request(app)
        .post('/api/v2/messages')
        .set({'Authorization':v2token,'Accept':'application/json'})
        .send({
          subject: 'test mail',
          message: 'test message',
          email: 'a@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('the email does not exist');
          done();
        });
    });

    it('should not create a message without token', (done) => {
      chai.request(app)
        .post('/api/v2/messages')
        .send({
          subject: 'test mail',
          message: 'test message',
          email: 't@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('version 2 should create a message', (done) => {
      chai.request(app)
        .post('/api/v2/messages')
        .set({'Authorization':v2token,'Accept':'application/json'})
        .send({
          subject: 'test mail',
          message: 'test message',
          email: 't@epic.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('/api/v1/messages', () => {
    it('should view all recieved messages', (done) => {
      chai.request(app)
        .get('/api/v1/messages')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
    it('should not allow user view messages without token', (done) => {
      chai.request(app)
        .get('/api/v1/messages')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe(' version 2 /api/v2/messages', () => {
    it('version 2 should view all recieved messages', (done) => {
      chai.request(app)
        .get('/api/v2/messages')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
    it('version 2 should not allow user view messages without token', (done) => {
      chai.request(app)
        .get('/api/v2/messages')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });  

  describe('/api/v1/messages/getAMessage', () => {
    it('should not get a message without token', (done) => {
      chai.request(app)
        .get('/api/v1/messages/1')
        .end((err, res) => {
          if(!res){
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
          done();
        });
    });

    it('should get a message', (done) => {
      chai.request(app)
        .get('/api/v1/messages/1')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .end((err, res) => {
          if(!res){
          expect(res).to.have.status(200);
        }
          done();
        });
    });
  }); 

  describe('version 2 /api/v2/messages/getAMessage', () => {
    it('version 2 should not get a message without token', (done) => {
      chai.request(app)
        .get('/api/v2/messages/1')
        .end((err, res) => {
          if(!res){
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
          done();
        });
    });

    it('version 2 should get a message with token', (done) => {
      chai.request(app)
        .get('/api/v2/messages/1')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .end((err, res) => {
          if(!res){
          expect(res).to.have.status(200);
        }
          done();
        });
    });
  }); 

  describe('/api/v1/unreadMessages', () => {
    it('should not display all unread messages', (done) => {
      chai.request(app)
        .get('/api/v1/unreadMessages')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should display all unread messages', (done) => {
      chai.request(app)
        .get('/api/v1/unreadMessages')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('version 2 /api/v1/unreadMessages', () => {
    it('version 2 should not display all unread messages', (done) => {
      chai.request(app)
        .get('/api/v2/unreadMessages')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('version 2 should display all unread messages', (done) => {
      chai.request(app)
        .get('/api/v2/unreadMessages')
        .set({'Authorization':v2token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('/api/v1/sentMessages', () => {
    it('should not display all messages sent by a user without token', (done) => {
      chai.request(app)
        .get('/api/v1/sentMessages')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should display all messages sent by a user', (done) => {
      chai.request(app)
        .get('/api/v1/sentMessages')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('version 2 /api/v2/sentMessages', () => {
    it('version 2 should not display all messages sent by a user without token', (done) => {
      chai.request(app)
        .get('/api/v2/sentMessages')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('version 2 should display all messages sent by a user', (done) => {
      chai.request(app)
        .get('/api/v2/sentMessages')
        .set({'Authorization':v2token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // describe('/api/v1/users', () => {
  //   it('should display a particular user email', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/users/1')
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         done();
  //       });
  //   });
  // });

  describe('/api/v1/messages', () => {
    it('should not delete a message without token', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/1')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not delete a message without an ID', (done) => {
      chai.request(app)
        .delete('/api/v1/messages')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should delete a message', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/1')
        .set({'Authorization':v1token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('version 2 /api/v2/messages', () => {
    it('version 2 should not delete a message without token', (done) => {
      chai.request(app)
        .delete('/api/v2/messages/11')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it(' version 2 should not delete a message without an ID', (done) => {
      chai.request(app)
        .delete('/api/v2/messages')
        .set({'Authorization':v2token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('version 2 should delete a message', (done) => {
      chai.request(app)
        .delete('/api/v2/messages/39')
        .set({'Authorization':v2token,'Accept':'application/json'})
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });