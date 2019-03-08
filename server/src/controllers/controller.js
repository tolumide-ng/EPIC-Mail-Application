/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable no-else-return */
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/model';

const Model = {
    createAUser(req, res) {
      const user = UserModel.createUser(req.body);
        const email = req.body.email;
        if (!email || !req.body.firstName || !req.body.lastName || !req.body.password) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        if (email || req.body.firstName || req.body.lastName || req.body.password) {
          // eslint-disable-next-line prefer-const
          let token = jwt.sign({ email: email },
            config.secret,
            { expiresIn: '24h' });
          res.json({
            status: 200,
            data:
           {
             message: `Authentication successful!. Welcome ${req.body.firstName}`,
             token: token,
           },
          });
        }
        return '';
      },
      login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const mockEmail = 't@a.com';
        const mockPassword = 'test';
        if (!email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        if (email !== mockEmail || password !== mockPassword) {
          return res.status(400).json({ message: 'Username or password is incorrect' });
        }
        if (email === mockEmail && password === mockPassword) {
          // eslint-disable-next-line prefer-const
          let token = jwt.sign({ email: email },
            config.secret,
            { expiresIn: '24h' });
          res.json({
            status: 200,
            data:
            {
              token: token,
            },
          });
        }
        return '';
      },
      sendMessage(req, res) {
        if (!req.body.subject || !req.body.message || !req.body.sender || !req.body.reciever) {
          return res.status(400).send({ message: 'All fields are required' });
        }
        const message = UserModel.sendMessage(req.body);
        return res.status(200).send(message);
      },
      getAllMessagesPerUser(req, res) {
        const message = UserModel.getAllMessagesPerUser(req.params.id);
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        const arrOfMessages = [];
        Object.values(message).forEach(i => arrOfMessages.push(i));
        res.status(200).send(Object.values(arrOfMessages));
      },
      getUnreadMessagesPerUser(req, res) {
        const message = UserModel.getUnreadMessagesPerUser(req.params.id);
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        const arrOfMessages = [];
        Object.values(message).forEach(i => arrOfMessages.push(i));
        res.status(200).send(Object.values(arrOfMessages));
      },
      /* credit: Orji Ikechukwu (LFA Andela) */
      getAMessage(req, res) {
        const message = UserModel.getAMessage(req.params.id);
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        message.status = 'read';
        res.status(200).json(message);
      },
      getMessagesSentByAUser(req, res) {
        const message = UserModel.getMessagesSentByAUser(req.params.id);
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        const arrOfSentMessages = [];
        Object.values(message).forEach(i => arrOfSentMessages.push(i));
        res.status(200).send(Object.values(arrOfSentMessages));
      },
      getOneUser(req, res) {
        const user = UserModel.findOneUser(req.params.id);
        if (!user) {
          return res.status(404).send({ message: 'user email not found' });
        }
        return res.status(200).send(user);
      },
      deleteAMessage(req, res) {
        const message = UserModel.getAMessage(req.params.id);
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        const msgToBeDeleted = UserModel.deleteAMessage(req.params.id);
        res.status(404).send('the selected message is deleted');
      },
      
};

export default Model;