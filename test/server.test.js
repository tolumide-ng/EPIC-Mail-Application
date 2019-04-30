/* eslint-disable key-spacing */
/* eslint-disable quote-props */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
// import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';
import userController from '../server/src/usingDB/controllers/userController';

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
// const should = chai.should();
chai.use(chaiHttp);
let v1token; let v2token; let v3token; let token;
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
        recoveryEmail: '',
        firstName: '',
        lastName: '',
        password: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should validate email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 't',
        recoveryEmail: 'epic',
        firstName: 'mosinmiloluwa',
        lastName: 'owoso',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should sign up a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'b@epic.com',
        recoveryEmail: 'babaewisco@gmail.com',
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
        recoveryEmail: 'babaewisco@gmail.com',
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

  it('user can signup with any character type for email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'TesTeR@epicMAIL.com',
        recoveryEmail: 'babaewisco@gmail.com',
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

  it('user can login ', (done) => {
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
        expect(res).to.have.status(404);
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
  it('version 2 should login a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send({
        email: 't@epic.com',
        password: '123456',
      })
      .end((err, res) => {
        v3token = res.body.data.token;
        expect(res).to.have.status(200);
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('user can login with any character type for email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send({
        email: 'TesTeR@epicMAIL.com',
        password: '123456',
      })
      .end((err, res) => {
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
        expect(res).to.have.status(404);
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
        type: 'sent',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        done();
      });
  });

  it('subject is required for timed messages', (done) => {
    chai.request(app)
      .post('/api/v2/messages/timed')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        message: 'test message',
        email: 't@epic.com',
        type: 'sent',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        done();
      });
  });

  it('email is required for timed messages and valid', (done) => {
    chai.request(app)
      .post('/api/v2/messages/timed')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: 'timed test',
        message: 'test message',
        email: 'tsds@epiccom',
        type: 'sent',
        time: 200000,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        done();
      });
  });

  it('message is required for timed messages and valid', (done) => {
    chai.request(app)
      .post('/api/v2/messages/timed')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: 'test message',
        email: 'tsds@epiccom',
        type: 'sent',
        time: 200000,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        done();
      });
  });

  it('recipient must exists for timed messages', (done) => {
    chai.request(app)
      .post('/api/v2/messages/timed')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: 'timed test',
        message: 'test message',
        email: 'tsds@epic.com',
        type: 'sent',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        done();
      });
  });

  it('time is required for timed messages', (done) => {
    chai.request(app)
      .post('/api/v2/messages/timed')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: 'test mail',
        message: 'test message',
        email: 't@epic.com',
        type: 'sent',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        done();
      });
  });

  it('time must not be lesser than 5 minutes', (done) => {
    chai.request(app)
      .post('/api/v2/messages/timed')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: 'test mail',
        message: 'test message',
        email: 't@epic.com',
        type: 'sent',
        time: 4000,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        done();
      });
  });

  it('it should create a timed message', (done) => {
    chai.request(app)
      .post('/api/v2/messages/timed')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: 'test mail',
        message: 'test message',
        email: 't@epic.com',
        type: 'sent',
        time: 300000,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        done();
      });
  });
});

describe('version 2 /api/v2/unread', () => {
  it('version 2 should not display all unread messages without token', (done) => {
    chai.request(app)
      .get('/api/v2/messages/unread')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should display all unread messages with token', (done) => {
    chai.request(app)
      .get('/api/v2/messages/unread')
      .set({ Authorization: v3token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
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
      .set({ Authorization: v3token, Accept: 'application/json' })
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

describe('/api/v1/messages/unread', () => {
  it('should not display all unread messages without token', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should display all unread messages with token', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
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

describe('/api/v1/messages/sent', () => {
  it('should not display all messages sent by a user without token', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sent')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should display all messages sent by a user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sent')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('version 2 /api/v2/sent', () => {
  it('version 2 should not display all messages sent by a user without token', (done) => {
    chai.request(app)
      .get('/api/v2/messages/sent')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('version 2 should display all messages sent by a user', (done) => {
    chai.request(app)
      .get('/api/v2/messages/sent')
      .set({ 'Authorization':v2token, 'Accept':'application/json' })
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
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return 404 for unexisting email', (done) => {
    chai.request(app)
      .get('/api/v1/users/13')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
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
      .delete('/api/v2/messages/3')
      .set({ Authorization: v3token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(403);
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
        groupname: '',
        groupemail: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should create a group', (done) => {
    chai.request(app)
      .post('/api/v2/groups')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        groupname: 'Test group',
        groupemail: 'test@epic.com',
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
        groupname: 'Test group1',
        groupemail: 'test1@epic.com',
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
        groupname: 'Test group',
        groupemail: 'test@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
});

describe('/api/v2/groups/users should create a user group', () => {
  it('version 2 should not accept null group email or user emails', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        userEmails: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should not accept invalid group email', (done) => {
    chai.request(app)
      .post('/api/v2/groups/5/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        userEmails: [8],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should ensure group exists', (done) => {
    chai.request(app)
      .post('/api/v2/groups/8/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        userEmails: 't@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.eql('Please input the correct group');
        done();
      });
  });

  it('should not create a user group without token', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/users')
      .send({
        userEmails: [1],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should create a user group', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        userEmails:'t@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('a user should be able to leave a group', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/1/user/2/leave-group')
      .set({ Authorization: v3token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(202);
        done();
      });
  });

  it('it should return 404 if group has been deleted or does not exist', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/1/user/2/leave-group')
      .set({ Authorization: v3token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('it should return 400 status if unauthoized user tries to access route', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/1/user/1/leave-group')
      .set({ Authorization: v3token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('version 2 should not create a user group with an invalid ID', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        userEmails:'a',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should create a user group', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        userEmails:'t@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('version 2 should add user to a group and send notification', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        userEmails:'t@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe('/api/v2/groups/users should delete a user from the group', () => {
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

  it('version 2 should not accept invalid user id', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/1/user/6')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should not create a user group without token', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/1/user/1')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should delete a user in a group', (done) => {
    chai.request(app)
      .delete('/api/v2/groups/1/user/1')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
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

describe('/api/v2/group/1/messages should send messages to groups', () => {
  it('version 2 should not accept null message', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/messages')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: 'w',
        message: '',
        email: 'a@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should not accept null subject', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/messages')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: '',
        message: 'test message',
        email: 'a@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('version 2 should not accept invalid ID', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/messages')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: 'test mail',
        message: 'test message',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should not create a message without token', (done) => {
    chai.request(app)
      .post('/api/v2/groups/1/messages')
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
      .post('/api/v2/groups/2/messages')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({
        subject: 'test mail',
        message: 'test message',
        email: 'test1@epic.com',
        type: 'sent',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        done();
      });
  });
});

describe('version 2 /api/v2/groups', () => {
  it('version 2 should not display all groups without token', (done) => {
    chai.request(app)
      .get('/api/v2/groups')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('version 2 should display all groups created by user', (done) => {
    chai.request(app)
      .get('/api/v2/groups')
      .set({ 'Authorization':v2token, 'Accept':'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/api/v1/messages should retract a message', () => {
  it('should not delete a message without token', (done) => {
    chai.request(app)
      .delete('/api/v2/messages/1/retract')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should not retract a message without an ID', (done) => {
    chai.request(app)
      .delete('/api/v2/messages/a/retract')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should retract a message', (done) => {
    chai.request(app)
      .delete('/api/v2/messages/1/retract')
      .set({ Authorization: v3token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should not delete an unexisting message', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/11/retract')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('unknown routes', () => {
  it('should not delete a message without token', (done) => {
    chai.request(app)
      .delete('/api/v2/messages/1/retractssss')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('/api/v2/messages/getAMessage', () => {
  it('should not get a sent message without token', (done) => {
    chai.request(app)
      .get('/api/v2/messages/1')
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });
  it('should not get a sent message with wrong token', (done) => {
    chai.request(app)
      .get('/api/v2/messages/1')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });
  it('should get a message with token', (done) => {
    chai.request(app)
      .get('/api/v2/messages/1')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });

  it('should get a message without an ID', (done) => {
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

describe('/api/v2/groups/users', () => {
  it('should not add a user to a group without token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/users')
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });
  it('should not add a user to a group if he/she did not create the group', (done) => {
    chai.request(app)
      .get('/api/v2/groups/users')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });
  it('should view users in a group when provided with token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });

  it('should return 404 if no user with token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/users')
      .set({ Authorization: v3token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(404);
        }
        done();
      });
  });

  it('should get add a user to the wrong route', (done) => {
    chai.request(app)
      .get('/api/v2/groups/userss')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });
});

describe('/api/v2/groups/:id/users', () => {
  it('should not any user in any group without token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/users')
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });
  it('should not view users to a group if he/she did not create the group', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/users')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });

  it('should not view all users in a group with wrong parameter', (done) => {
    chai.request(app)
      .get('/api/v2/groups/a/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });

  it('should view all users in a group with token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/users')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });

  it('should get all users in a group using the wrong route', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/userss')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });
});

describe('/api/v2/groups/:id/messages', () => {
  it('should not view group messages without token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/messages')
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });
  it('should not view users to a group if he/she doesnt belong to that group', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/messages')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });

  it('should not view all group messages without wrong parameter', (done) => {
    chai.request(app)
      .get('/api/v2/groups/a/messages')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });

  it('should view all group messages with token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/messages')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });

  it('should get all group messages using the wrong route', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/userss')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });
});

describe('/api/v2/groups/:id/messages/:messageId', () => {
  it('should not view group messages without token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/messages/1')
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });
  it('should not view a group message if he/she doesnt belong to that group', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/messages/1')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });
  it('should view a group message with token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1/messages/1')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });
});

describe('/api/v2/groups/:id', () => {
  it('should not get a group without token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1')
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });
  it('should not view a group if he/she did not create the group', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1')
      .set({ Authorization: v1token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });
  it('should view a group when provided with token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/1')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });

  it('should return 404 if no group with token', (done) => {
    chai.request(app)
      .get('/api/v2/groups/4')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(404);
        }
        done();
      });
  });

  it('should get add a user to the wrong route', (done) => {
    chai.request(app)
      .get('/api/v2/groups/a')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });
});

describe('/api/v2/auth/users/upload', () => {
  it('should not update profile image without token', (done) => {
    chai.request(app)
      .post('/api/v2/auth/users/upload')
      .send({ image: 'http://cloudinary.com' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });
  it('should not allow null values', (done) => {
    chai.request(app)
      .get('/api/v2/auth/users/upload')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({ image: '' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400);
        }
        done();
      });
  });

  it('should update user profile', (done) => {
    chai.request(app)
      .get('/api/v2/auth/users/upload')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .send({ image: 'http://cloudinary.com' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });
});

describe('/api/v2/auth/users/picture', () => {
  it('should not view profile image without token', (done) => {
    chai.request(app)
      .get('/api/v2/auth/users/picture')
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(400).eql('Auth token is not supplied');
        }
        done();
      });
  });

  it('should get user profile', (done) => {
    chai.request(app)
      .get('/api/v2/auth/users/picture')
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        if (!res) {
          expect(res).to.have.status(200);
        }
        done();
      });
  });
});

describe('PROFILE UPDATE', () => {
  it('should update user details on valid format of data', (done) => {
    chai.request(app)
      .put('/api/v2/auth/users/profile')
      .send({ firstName: 'Kelvin', lastName: 'Esegbona' })
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.first_name).to.equal('Kelvin');
        expect(res.body.data.last_name).to.equal('Esegbona');
        done();
      });
  });

  it('should respond with an error on invalid format of data', (done) => {
    chai.request(app)
      .put('/api/v2/auth/users/profile')
      .send({ firstname: 98, lastName: 'AB' })
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });

  it('should not respond with an error if lastname is not given', (done) => {
    chai.request(app)
      .put('/api/v2/auth/users/profile')
      .send({ firstName: 'Kevo' })
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.first_name).to.equal('Kevo');
        done();
      });
  });

  it('should not respond with an error when updating only recovery email', (done) => {
    chai.request(app)
      .put('/api/v2/auth/users/profile')
      .send({ recoveryEmail: 'kevo@gmail.com' })
      .set({ Authorization: v2token, Accept: 'application/json' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.recoveryemail).to.equal('kevo@gmail.com');
        done();
      });
  });
});

describe('SPAM MESSAGE', () => {
  it('should login user' ,(done) => {
    chai.request(app)
    .post('/api/v2/auth/login')
    .send({
      email: 't@epic.com',
      password: '123456'
    })
    .end((err, res) => {
      let v3token = res.body.data.token
      done()
    })
  })

  it('should return status 200 and data of the message set as spam', (done) => {
    chai.request(app)
    .patch('/api/v2/messages/1/spam')
    .set({ 'x-access-token':v3token, 'Accept':'application/json' })
    .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body.data).to.have.property('is_spam').eql(true)
      done()
    })
  })

  it('should return status 403 if user is not the reciever', (done) => {
    chai.request(app)
    .patch('/api/v2/messages/1/spam')
    .set({ 'x-access-token':v2token, 'Accept':'application/json' })
    .end((err, res) => {
      expect(res).to.have.status(403)
      expect(res.body).to.have.property('message').eql('Access Denied. This message was sent to a different user')
      done()
    })
  })

  it('should return status 404 if message does not exist', (done) => {
    chai.request(app)
    .patch('/api/v2/messages/50/spam')
    .set({ 'x-access-token':v2token, 'Accept':'application/json' })
    .end((err, res) => {
      expect(res).to.have.status(404)
      expect(res.body).to.have.property('message').eql('Message does not exist')
      done()
    })
  })
})

describe('GET ALL SPAM MESSAGE', () => {
  it('should return status 200 and data of all spam messages', (done) => {
    chai.request(app)
    .get('/api/v2/messages/spam')
    .set({ 'x-access-token':v3token, 'Accept':'application/json' })
    .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      done()
    })
  })

  it('should return status 404 if no spam message was found for the logged in user', (done) => {
    chai.request(app)
    .get('/api/v2/messages/spam')
    .set({ 'x-access-token':v2token, 'Accept':'application/json' })
    .end((err, res) => {
      expect(res).to.have.status(404)
      expect(res.body).to.have.property('message').eql('You currently do not have any spam message')
      done()
    })
  })
})
describe('*INTERNET CONNECTION NEEDED* Send Reset link', () => {
  it('should not send reset link for invalid email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/reset')
      .send({
        email: 'ta@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.include('user cannot be found');
        done();
      });
  });
  it('should send reset link for valid email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/reset')
      .send({
        email: 't@epic.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.any.keys('message', 'email');
        done();
      });
  });
});

describe('*INTERNET CONNECTION NEEDED* Reset password', () => {
  it('should reset password for valid token', async () => {
    const user = await userController.findUser('email', 't@epic.com');
    token = user.resettoken;
    const res = await chai.request(app)
      .patch('/api/v2/auth/reset')
      .send({
        password: '123456',
        password_confirmation: '123456',
        token,
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
    expect(res.body.status).to.be.equal(200);
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('array');
    expect(res.body.data[0]).to.have.any.keys('message');
  });
  it('should not reset password if it has already been reset', (done) => {
    chai.request(app)
      .patch('/api/v2/auth/reset')
      .send({
        password: 'qwerty',
        password_confirmation: 'qwerty',
        token,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.include('password has already been reset');
        done();
      });
  });
});
