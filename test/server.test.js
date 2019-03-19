/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import app from '../server/server';

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
// const should = chai.should();
chai.use(chaiHttp);
let v1token; let v2token;
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
        expect(res.body).to.have.property('message');
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
        expect(res.body).to.have.property('message');
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
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('message').eql('Authentication successful!. Welcome mosinmiloluwa');
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
        expect(res).to.have.status(201);
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
  it('should not allow invalid credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'c@epic.com',
        password: '1234',
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.eql('Incorrect username or password');

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
  it('version 2 should not allow invalid credentials', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send({
        email: 'c@epic.com',
        password: '1234',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.eql('email or password is incorrect');

        done();
      });
  });
  it('version 2 should login a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send({
        email: 'b@epic.com',
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
      .set({ Authorization: v1token, Accept: 'application/json' })
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
      .set({ Authorization: v1token, Accept: 'application/json' })
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

  it('should create a message', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set({ Authorization: v1token, Accept: 'application/json' })
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
      .set({ Authorization: v2token, Accept: 'application/json' })
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
      .set({ Authorization: v2token, Accept: 'application/json' })
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
      .set({ Authorization: v2token, Accept: 'application/json' })
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
      .set({ Authorization: v2token, Accept: 'application/json' })
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
      .set({ Authorization: v1token, Accept: 'application/json' })
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
      .set({ Authorization: v1token, Accept: 'application/json' })
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
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });

  it('should get a message with token', (done) => {
    chai.request(app)
      .get('/api/v1/messages/1')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });

  it('should get a message without an ID', (done) => {
    chai.request(app)
      .get('/api/v1/messages')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(404);
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
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });

  it('version 2 should get a message with token', (done) => {
    chai.request(app)
      .get('/api/v2/messages/1')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });

  it('version 2 should get a message without ID', (done) => {
    chai.request(app)
      .get('/api/v2/messages')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(404);
        }
        done();
      });
  });
});

describe('/api/v1/messages/unreadMessages', () => {
  it('should not display all unread messages without token', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unreadMessages')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should display all unread messages with token', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unreadMessages')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('version 2 /api/v1/unreadMessages', () => {
  it('version 2 should not display all unread messages without token', (done) => {
    chai.request(app)
      .get('/api/v2/messages/unreadMessages')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  // it('version 2 should display all unread messages with token', (done) => {
  //   chai.request(app)
  //     .get('/api/v2/messages/unreadMessages')
  //     .set({'Authorization':v2token,'Accept':'application/json'})
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });
});

describe('/api/v1/messages/sentMessages', () => {
  it('should not display all messages sent by a user without token', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sentMessages')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should display all messages sent by a user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sentMessages')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('version 2 /api/v2/sentMessages', () => {
  it('version 2 should not display all messages sent by a user without token', (done) => {
    chai.request(app)
      .get('/api/v2/messages/sentMessages')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  // it('version 2 should display all messages sent by a user', (done) => {
  //   chai.request(app)
  //     .get('/api/v2/messages/sentMessages')
  //     .set({'Authorization':v2token,'Accept':'application/json'})
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });
});

describe('/api/v1/users', () => {
  it('should display a particular user email', (done) => {
    chai.request(app)
      .get('/api/v1/users/1')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return 404 for unexisting email', (done) => {
    chai.request(app)
      .get('/api/v1/users/13')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return 404 for no argument', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

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
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should delete a message', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/1')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should not delete an unexisting message', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/11')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('version 2 /api/v2/messages', () => {
  it('version 2 should not delete a message without token', (done) => {
    chai.request(app)
      .delete('/api/v2/messages/1')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it(' version 2 should not delete a message without an ID', (done) => {
    chai.request(app)
      .delete('/api/v2/messages')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('version 2 should not delete a message if he doesnt own it', (done) => {
    chai.request(app)
      .delete('/api/v2/messages/1')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('/api/v2/groups', () => {
  it('should not accept null values', (done) => {
    chai.request(app)
      .post('/api/v2/groups')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupName: '',
        groupEmail: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should validate email', (done) => {
    chai.request(app)
      .post('/api/v2/groups')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupName: 'gggg',
        groupEmail: 't@e.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.eql('please enter a valid epic email');
        done();
      });
  });

  it('should create a group', (done) => {
    chai.request(app)
      .post('/api/v2/groups')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupName: 'Test group',
        groupEmail: 'test@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Email group created successfully');
        done();
      });
  });

  it('should create a group', (done) => {
    chai.request(app)
      .post('/api/v2/groups')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupName: 'Test group1',
        groupEmail: 'test1@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Email group created successfully');
        done();
      });
  });

  it('should not create duplicate group', (done) => {
    chai.request(app)
      .post('/api/v2/groups')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupName: 'Test group',
        groupEmail: 'test@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('/api/v2/groups/users', () => {
  it('version 2 should not accept null group email or user emails', (done) => {
    chai.request(app)
      .post('/api/v2/groups/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupEmail: '',
        userEmails: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.eql('please enter groupEmail and user emails are required');
        done();
      });
  });

  it('version 2 should not accept invalid group email', (done) => {
    chai.request(app)
      .post('/api/v2/groups/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupEmail: 't@epic.com',
        userEmails: 'a@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.eql('There is an error, it is either group does not exist or you are not allowed to add users to this group');
        done();
      });
  });

  it('version 2 should ensure group exists', (done) => {
    chai.request(app)
      .post('/api/v2/groups/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupEmail: 't@epic.com',
        userEmails: 'a@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.eql('There is an error, it is either group does not exist or you are not allowed to add users to this group');
        done();
      });
  });

  it('should not create a user group without token', (done) => {
    chai.request(app)
      .post('/api/v2/groups/users')
      .send({
        groupEmail: 't@epic.com',
        userEmails: 'a@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should create a user group', (done) => {
    chai.request(app)
      .post('/api/v2/groups/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupEmail: 'test@epic.com',
        userEmails: [1, 2],
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('version 2 should create a user group', (done) => {
    chai.request(app)
      .post('/api/v2/groups/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupEmail: 'test1@epic.com',
        userEmails: [1, 2],
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe('/api/v2/groups/users', () => {
  it('version 2 should not accept null values', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should not accept invalid group id and user id', (done) => {
    chai.request(app)
      .delete('/api/v2/groupsuser/4/6')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should not create a user group without token', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/user/1/1')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should delete a user in a group', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/user/1/1')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/api/v2/groups/', () => {
  it('version 2 should not accept null values', (done) => {
    chai.request(app)
      .delete('/api/v2/groups')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('version 2 should not accept invalid group id', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/4')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('version 2 should ensure group exists', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/5')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should not create a user group without token', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/1')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should delete a group', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/1')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
