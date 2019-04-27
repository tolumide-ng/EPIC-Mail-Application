import chai from 'chai';
import chaiHttp from 'chai-http';
import server from "../server/server";

chai.use(chaiHttp);


const should = chai.should();
const { expect } = chai;

const messagesRoute = '/api/v2/messages/';
const userRoute = '/api/v2/auth/';

const mockDetails = {
    rotimi: {
        email: 'rotimi@epicmail.com',
        firstName: 'Rotimi',
        lastName: 'Okadigbo',
        password: 'fiberesima',
        recoveryEmail: 'gentle@gmail.com',
    },

    nNeka: {
        email: 'nneka@epicmail.com',
        firstName: 'Olamide',
        lastName: 'Nneka',
        password: 'thePassword',
        recoveryEmail: 'theEmail@gmail.com',
    },

    theMessage: {
        subject: 'The way leleyi',
        email: 'nneka@epicmail.com',
        message: 'This is the content of the message',
        type: 'sent',
    },
};

const { rotimi, nNeka, theMessage } = mockDetails

const details = {};

describe('Create the users for message exchange', () => {
    before((done) => {
        chai.request(server)
            .post(`${userRoute}/signup`)
            .set('Accept', 'application/json')
            .send(rotimi)
            .end((req, res) => {
                details.rotimiToken = res.body.data.token;
                done();
            });
    });

    before((done) => {
        chai.request(server)
            .post(`${userRoute}/signup`)
            .set('Authorization', 'application/json')
            .send(nNeka)
            .end((req, res) => {
                details.nNekaToken = res.body.data.token;
                done();
            });
    });

    before((done) => {
        chai.request(server)
            .post(`${messagesRoute}/`)
            .set('Authorization', `${details.rotimiToken}`)
            .send(theMessage)
            .end((req, res) => {
                details.firstMessageId = res.body.data.id
                done();
            })
    })

    before((done) => {
        chai.request(server)
            .post(`${messagesRoute}/`)
            .set('Authorization', `${details.rotimiToken}`)
            .send(theMessage)
            .end((req, res) => {
                details.secondMessageId = res.body.data.id
                done();
            })
    })

    before((done) => {
        chai.request(server)
            .post(`${messagesRoute}/`)
            .set('Authorization', `${details.rotimiToken}`)
            .send(theMessage)
            .end((req, res) => {
                details.thirdMessageId = res.body.data.id
                done();
            })
    })

    before((done) => {
        chai.request(server)
            .post(`${messagesRoute}/`)
            .set('Authorization', `${details.rotimiToken}`)
            .send(theMessage)
            .end((req, res) => {
                details.fourthMessageId = res.body.data.id
                done();
            })
    })

    before((done) => {
        chai.request(server)
            .post(`${messagesRoute}/`)
            .set('Authorization', `${details.rotimiToken}`)
            .send(theMessage)
            .end((req, res) => {
                details.fifthMessageId = res.body.data.id
                done();
            })
    })

    before((done) => {
        chai.request(server)
            .post(`${messagesRoute}/`)
            .set('Authorization', `${details.rotimiToken}`)
            .send(theMessage)
            .end((req, res) => {
                details.sixthMessageId = res.body.data.id
                done();
            })
    })


    it('should be able to get a specific message that has not been deleted', (done) => {
        chai.request(server)
            .get(`${messagesRoute}/specific/${details.firstMessageId}`)
            .set('Authorization', `${details.rotimiToken}`)
            .send(theMessage)
            .end((req, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                expect(res.body.data[0]).to.have.own.property('id', Number(`${details.firstMessageId}`));
                expect(res.body.data[0]).to.have.own.property('subject', `${theMessage.subject}`);
                done();
            })
    });

    it('should be able to get a specific message that has not been deleted', (done) => {
        chai.request(server)
            .get(`${messagesRoute}/specific/900`)
            .set('Authorization', `${details.rotimiToken}`)
            .send(theMessage)
            .end((req, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.have.property('error');
                expect(res.body).to.have.own.property('error', 'You do not have any message with the specified id');
                done();
            })
    });

    it('should return a 404 response if the message(s) does not exist', (done) => {
        chai.request(server)
            .delete(`${messagesRoute}/multiple/`)
            .set('Authorization', `${details.rotimiToken}`)
            .send({ ids: [900, 909], type: 'sent' })
            .end((req, res) => {
                res.should.be.json;
                res.should.have.status(404);
                expect(res.body).to.have.own.property('error', 'You do not have any message with any of the listed ids');
                done();
            })
    });

    it('should return a 400 bad request if no id is specified', (done) => {
        chai.request(server)
            .delete(`${messagesRoute}/multiple/`)
            .set('Authorization', `${details.rotimiToken}`)
            .send({ type: 'sent' })
            .end((req, res) => {
                res.should.be.json;
                res.should.have.status(400);
                expect(res.body).to.have.own.property('error', 'Please indicate the messages you would like to delete');
                done();
            })
    });

    it('should return a 400 bad request if the type of the message is not specified', (done) => {
        chai.request(server)
            .delete(`${messagesRoute}/multiple`)
            .set('Authorization', `${details.rotimiToken}`)
            .send({ ids: [400, 300] })
            .end((req, res) => {
                res.should.be.json;
                res.should.have.status(400);
                expect(res.body).to.have.own.property('error', 'Bad request: Please indicate the type of message you are trying to delete e.g. draft, sent, or inbox');
                done();
            })
    });

    it('should successfully delete the specified messages', (done) => {
        chai.request(server)
            .delete(`${messagesRoute}/multiple`)
            .set('Authorization', `${details.rotimiToken}`)
            .send({ ids: [Number(`${details.firstMessageId}`), Number(`${details.secondMessageId}`)], type: 'sent' })
            .end((req, res) => {
                res.should.have.status(200);
                res.should.be.json;
                expect(res.body).to.have.own.property('data', 'All specified messages have been deleted');
                done();
            })
    });

    it('should specify a deleted message and a message that did not exist in the list', (done) => {
        chai.request(server)
            .delete(`${messagesRoute}/multiple`)
            .set('Authorization', `${details.rotimiToken}`)
            .send({ ids: [Number(`${details.firstMessageId}`), Number(`${details.thirdMessageId}`)], type: 'sent' })
            .end((req, res) => {
                res.should.be.json;
                res.should.have.status(200);
                expect(res.body).to.have.own.property('data', `Valid Messages have been deleted but you do not have messages with id = ${Number(details.firstMessageId)}`);
                done();
            })
    });

    it('should be able to get a specific message that has not been deleted', (done) => {
        chai.request(server)
            .get(`${messagesRoute}/specific/${details.firstMessageId}`)
            .set('Authorization', `${details.rotimiToken}`)
            .send(theMessage)
            .end((req, res) => {
                console.log(res.body);
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.have.property('error');
                expect(res.body).to.have.own.property('error', 'You do not have any message with the specified id');
                done();
            })
    })
});