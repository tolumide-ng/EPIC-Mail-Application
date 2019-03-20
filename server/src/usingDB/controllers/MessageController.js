/* eslint-disable brace-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import db from '../db';

class MessageController {
  static async sendMessage(req, res) {
    const { email } = req.body;
    // u need to do this cos row[0] cant be used outside await db.query
    let userData = [];
    // use $1 to refer to the first record in ur search
    const findOneEmail = 'SELECT * FROM users WHERE email=$1';
    if (!req.body.subject) {
      return res.status(400).send({ message: 'A subject is required' });
    }
    if (!req.body.message) {
      return res.status(400).send({ message: 'A message is required' });
    }
    if (!req.body.email) {
      return res.status(400).send({ message: 'Email is required' });
    }
    // validate to ensure its a valid mail and its an epic mail
    const validateEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const result = validateEmail.test(email);
    const newVal = email.split('@');
    const finalCheck = newVal[1];
    if (!result || finalCheck !== 'epic.com') {
      return res.status(400).send({ message: 'please enter a valid epic email' });
    }
    // if it passes valid mail, confirm that the email exist
    if (req.body.email) {
      try {
        const { rows } = await db.query(findOneEmail, [email]);
        userData = rows[0];
        if (!userData) {
          return res.status(400).send({ message: 'the email does not exist' });
        }
        if (userData.id === req.decodedMessage.id) {
          return res.status(400).send({ message: 'you cannot send messages to yourself' });
        }
      }
      // insert new message into db
      finally {
        const text = `
            INSERT INTO messages(created_on,email,subject,message,status,sender,reciever,group_reciever,is_deleted,group_status)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            returning *`;
        const values = [
          new Date(),
          req.body.email,
          req.body.subject,
          req.body.message,
          'unread',
          req.decodedMessage.id,
          userData.id,
          null,
          'false',
          'false',
        ];
        try {
          const { rows } = await db.query(text, values);
          return res.status(201).send(rows[0]);
        } catch (error) {
          return res.status(400).send(error);
        }
      }
    }
  }

  static async getAllMessagesPerUser(req, res) {
    let output = [];
    const messages = 'SELECT * FROM messages WHERE reciever=$1 AND is_deleted=$2';
    try {
      const { rows } = await db.query(messages, [req.decodedMessage.id, 'false']);
      output = rows;
      if (!output) {
        return res.status(400).send({ message: 'you have no messages' });
      }
    } finally {
      return res.status(200).send(output);
    }
  }

  static async getAMessage(req, res) {
    let output = [];
    const messages = 'SELECT * FROM messages WHERE id=$1 AND reciever=$2 AND is_deleted=$3';
    const updatestatus = 'UPDATE messages SET status=$1 WHERE id=$2 returning *';
    try {
      const { rows } = await db.query(messages, [req.params.id, req.decodedMessage.id, 'false']);
      output = rows[0];
      if (!output) {
        return res.status(400).send({ message: 'email cannot be found' });
      }
    } finally {
      if (output) {
        const values = ['read', req.params.id];
        const response = await db.query(updatestatus, values);
        return res.status(200).send(response.rows[0]);
      }
    }
  }

  static async getUnreadMessages(req, res) {
    let output = [];
    const messages = 'SELECT * FROM messages WHERE reciever=$1 AND status=$2 AND is_deleted=$3';
    const { rows } = await db.query(messages, [req.decodedMessage.id, 'unread', 'false']);
    output = rows;
    if (!output) {
      return res.status(400).send({ message: 'you have no unread messages' });
    }
    return res.status(200).send(output);
  }

  static async getMessagesSentByAUser(req, res) {
    let output = [];
    const messages = 'SELECT * FROM messages WHERE sender=$1';
    const { rows } = await db.query(messages, [req.decodedMessage.id]);
    output = rows;
    try {
      if (!output) {
        return res.status(400).send({ message: 'you have not sent any messages' });
      }
      return res.status(200).send(output);
    } catch (e) {
      return res.status(400).send({ message: 'something is wrong with your request' });
    }
  }

  static async deleteAMessage(req, res) {
    // let output = [];
    const messages = 'UPDATE messages SET is_deleted=$1 WHERE reciever=$2 AND id=$3 returning *';

    try {
      const { rows } = await db.query(messages, ['true', req.decodedMessage.id, req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'you cannot delete this message' });
      }
      return res.status(200).send({ message: 'the message has been deleted' });
      // if(!output) {
      //   return res.status(400).send({'message': 'email does not exist'});
      // }
    } catch (e) {
      return res.status(400).send({ message: 'email does not exist' });
    }
  }
}
export default MessageController;