/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import db from '../db';
import UserModel from '../../models/model';
import { uploader, cloudinaryConfig } from '../../../config/cloudinaryConfig';
import { dataUri } from '../../middleware/multer';

class UserController {
  static async createUser(req, res) {
    let userData = [];
    const findOneEmail = 'SELECT * FROM users WHERE email=$1';
    const { email } = req.body;
    const { recoveryEmail } = req.body;
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
          INSERT INTO users(email,first_name,last_name,password,recoveryemail)
          VALUES($1,$2,$3,$4,$5)
          returning *`;
    const values = [
      req.body.email.toLowerCase(),
      firstName,
      lastName,
      userData.password,
      recoveryEmail.toLowerCase(),
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
    const { rows } = await db.query(findOneEmail, [req.body.email.toLowerCase()]);
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
      const { firstName, lastName, recoveryEmail } = req.body;
      const updateQuery = userDetail => `UPDATE users SET ${userDetail} = $1 WHERE id = $2 RETURNING first_name, last_name, recoveryemail`
      if (firstName) result = await db.query(updateQuery('first_name'), [firstName, req.decodedMessage.id]);
      if (lastName) result = await db.query(updateQuery('last_name'), [lastName, req.decodedMessage.id]);
      if (recoveryEmail) result = await db.query(updateQuery('recoveryemail'), [recoveryEmail.toLowerCase(), req.decodedMessage.id]);

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
  
  /* reset link get api/v2/auth/reset */
  static async validateResetToken(req, res) {
    if (!req.query.token) {
      res.render('error', { error: 'You are not authorized to view this page' });
      return res.status(401).send({
        status: 401,
        error: 'You are not authorized to view this page',
      });
    }
    const { token } = req.query;
    const userPresent = await UserController.findUser('resettoken', token);
    if (!userPresent) {
      res.render('error', { error: 'Password reset link is invalid' });
      return res.status(400).send({
        status: 400,
        error: 'Password reset link is invalid',
      });
    }
    const { resetexpire } = userPresent;
    const expire = new Date(resetexpire);
    const now = Date();
    if (resetexpire < now) {
      res.render('error', { error: 'Password reset link has expired' });
      return res.status(400).send({
        status: 400,
        error: 'Password reset link has expired',
      });
    }
    res.render('reset', { token });
  }

  /* reset link patch api/v2/auth/reset */
  static async resetPassword(req, res) {
    const userPresent = await UserController.findUser('resettoken', req.body.token);
    if (!userPresent) {
      return res.status(404).json({
        status: 404,
        error: 'password has already been reset',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    await db.query(`UPDATE users SET resettoken = $1, resetexpire = $2, password = $3
    WHERE id = $4`, ['', '', password, userPresent.id]);
    return res.status(200).json({
      status: 200,
      data: [{ message: 'Password has been suucessfully reset' }],
    });
  }

  /* reset link post api/v2/auth/reset */
  static async sendResetLink(req, res) {
    const userPresent = await UserController.findUser('email', req.body.email);
    if (!userPresent) {
      return res.status(404).send({
        status: 404,
        error: 'user cannot be found',
      });
    }
    const resettoken = crypto.randomBytes(20).toString('hex');
    const date = new Date();
    date.setHours(date.getHours() + 2);
    const resetexpire = date.toString();
    /* console.log(resetexpire); */
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    /* const host = 'http://localhost:5000/api/v2/auth/reset'; */
    const host = 'https://epicmail-application.herokuapp.com/api/v2/auth/reset';
    const text = `You are receiving this because you ( or someone else ) have requested the reset of the password for your EPIC-mail account. \n\n Please click on the following link, or paste this link into a browser to complete the process within one hour of receiving it \n\n ${host}?token=${resettoken} \n\n If you did not request this, please ignore this email and your password will remain unchanged`;
    const mailOptions = {
      from: 'epicmail',
      to: userPresent.recoveryemail,
      subject: 'Click to reset EPIC-mail password',
      text,
    };

    transporter.sendMail(mailOptions, async (er, resp) => {
      if (er) {
        return res.status(501).json({
          status: 501,
          error: er,
        });
      }
      try {
        await db.query(`UPDATE users SET resettoken = $1, resetexpire = $2
          WHERE id = $3`, [resettoken, resetexpire, userPresent.id]);
        return res.status(200).json({
          status: 200,
          data: [{
            message: 'Check your email for password reset link',
            email: userPresent.recoveryemail,
          }],
        });
      } catch (err) {
        /* console.log(err); */
        return res.status(500).send({
          status: 500,
          error: 'Internal Server Error',
        });
      }
    });
  }

  /* Helper function to cater for repitive find user action */
  static async findUser(column, value) {
    const { rows } = await db.query(`SELECT * FROM users WHERE ${column}=$1`, [value]);
    return rows[0];
  }
}

export default UserController;
