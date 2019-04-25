/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import db from '../db';
import UserModel from '../../models/model';
import { uploader, cloudinaryConfig } from '../../../config/cloudinaryConfig';
import { dataUri } from '../../middleware/multer';

class UserController {
  static async createUser(req, res) {
    let userData = [];
    const findOneEmail = 'SELECT * FROM users WHERE email=$1';
    const { email } = req.body;
    const lastName = req.body.lastName.replace(/\s/g, '');
    const password = req.body.password.trim();
    const firstName = req.body.firstName.trim();
    if (email) {
      const { rows } = await db.query(findOneEmail, [req.body.email.toLowerCase()]);
      userData = rows[0];
      if (userData) {
        return res.status(409).send({
          status: 409,
          message: 'email already exists',
        });
      }
    }
    const hashedPassword = UserModel.hashPassword(password);
    // call req.body, destructure to get password and then save encrypt into password
    userData = { ...req.body, password: hashedPassword };
    const text = `
          INSERT INTO users(email,first_name,last_name,password)
          VALUES($1,$2,$3,$4)
          returning *`;
    const values = [
      req.body.email.toLowerCase(),
      firstName,
      lastName,
      userData.password,
    ];
    try {
      const { rows } = await db.query(text, values);
      const token = jwt.sign({ email: rows[0].email, id: rows[0].id },
        process.env.SECRET,
        { expiresIn: '24h' });
      return res.status(201).send({
        status: 201,
        data:
           {
             message: `Authentication successful!. Welcome ${firstName}`,
             token,
           },
      });
      // return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(500).send('something went wrong with your request');
    }
  }

  static async login(req, res) {
    let userData = [];
    const findOneEmail = 'SELECT * FROM users WHERE email=$1';
    const { rows } = await db.query(findOneEmail, [req.body.email]);
    userData = rows[0];
    if (!userData) {
      return res.status(404).send({
        status: 404,
        message: 'email or password is incorrect',
      });
    }
    if (userData && !UserModel.comparePassword(userData.password, req.body.password)) {
      return res.status(400).send({
        status: 400,
        message: 'Username or password is incorrect',
      });
    }
    // eslint-disable-next-line prefer-const
    if (userData) {
      const userPicture = userData.profile_pic;
      const token = jwt.sign({ email: userData.email, id: userData.id },
        process.env.SECRET,
        { expiresIn: '24h' });
      return res.status(200).send({
        status: 200,
        data:
              {
                token,
              },
      });
    }

    return res.status(500).send({
      success: 500,
      message: 'something is wrong with your request',
    });
  }

  static async imageUpload(req, res) {
    const findOneUser = 'SELECT * FROM users where id=$1';
    const profilepic = 'UPDATE users SET profile_pic=$1 where id=$2 RETURNING *';
    const { rows: output } = await db.query(findOneUser, [req.decodedMessage.id]);
    if (!output) {
      return res.status(404).send({
        status: 404,
        message: 'user does not exist',
      });
    }
    const { rows } = await db.query(profilepic, [req.body.image, req.decodedMessage.id]);
    if (!rows[0]) {
      return res.status(404).send({
        status: 404,
        message: 'url not updated',
      });
    }
    return res.status(200).send({
      status: 200,
      message: 'profile picture added successfully',
    });
  }

  static async getAProfileImage(req, res) {
    const messages = 'SELECT * FROM users WHERE id=$1';
    const { rows } = await db.query(messages, [req.decodedMessage.id]);
    if (!rows[0]) {
      return res.status(404).send({
        success: 404,
        message: 'user cannot be found',
      });
    }
    return res.status(200).send({
      success: 200,
      data: rows[0],
    });
  }

  static async updateProfile(req, res) {
    let result;
    try {
      const { firstName, lastName } = req.body;
      const firstNameUpdate = 'UPDATE users SET first_name = $1 WHERE id = $2 RETURNING first_name, last_name';
      const lastNameUpdate = 'UPDATE users SET last_name = $1 WHERE id = $2 RETURNING first_name, last_name';
      if (firstName) result = await db.query(firstNameUpdate, [firstName, req.decodedMessage.id]);

      if (lastName) result = await db.query(lastNameUpdate, [lastName, req.decodedMessage.id]);

    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: 'Something went wrong',
      });
    }
    return res.status(200).send({
      status: 200,
      data: result.rows[0],
    });
  }
}

export default UserController;
