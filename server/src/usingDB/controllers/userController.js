/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import db from '../db';
import UserModel from '../../models/model';

class UserController {
  static async createUser(req, res) {
    // u need to do this cos row[0] cant be used outside await db.query
    let userData = [];
    // use $1 to refer to the first record in ur search
    const findOneEmail = 'SELECT * FROM users WHERE email=$1';
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'email is required' });
    }
    if (email) {
      const { rows } = await db.query(findOneEmail, [req.body.email]);
      userData = rows[0];
      if (userData) {
        return res.status(400).send({ message: 'email already exists' });
      }
      const validateEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      const result = validateEmail.test(email);
      const newVal = email.split('@');
      const finalCheck = newVal[1];
      if (!result || finalCheck !== 'epic.com') {
        return res.status(400).send({ message: 'please enter a valid epic email' });
      }
    }
    if (!req.body.firstName || req.body.firstName.length < 3) {
      return res.status(400).send({ message: 'first name is required and has a minimum of 3 characters' });
    }
    if (!req.body.lastName || req.body.lastName.length < 3) {
      return res.status(400).send({ message: 'last name is required and has a minimum of 3 characters' });
    }
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({ message: 'password is required and has a minimum of 6 characters' });
    }
    const hashedPassword = UserModel.hashPassword(req.body.password);
    // call req.body, destructure to get password and then save encrypt into password
    userData = { ...req.body, password: hashedPassword };
    const text = `
          INSERT INTO users(email,first_name,last_name,password)
          VALUES($1,$2,$3,$4)
          returning *`;
    const values = [
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      userData.password,
    ];
    try {
      const { rows } = await db.query(text, values);
      const token = jwt.sign({ email: userData.email, id: userData.id },
        process.env.SECRET,
        { expiresIn: '24h' });
      return res.status(201).send({
        status: 'success',
        data:
           {
             message: `Authentication successful!. Welcome ${req.body.firstName}`,
             token,
           },
      });
      // return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async login(req, res) {
    let userData = [];
    const findOneEmail = 'SELECT * FROM users WHERE email=$1';
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'email and password are required' });
    }
    const { rows } = await db.query(findOneEmail, [req.body.email]);
    userData = rows[0];
    if (!userData) {
      return res.status(400).send({ message: 'email or password is incorrect' });
    }
    if (userData && !UserModel.comparePassword(userData.password, req.body.password)) {
      return res.status(400).send({ message: 'Username or password is incorrect' });
    }
    // eslint-disable-next-line prefer-const
    if (userData) {
      const token = jwt.sign({ email: userData.email, id: userData.id },
        process.env.SECRET,
        { expiresIn: '24h' });
      return res.status(200).send({
        status: 'success',
        data:
              {
                token,
              },
      });
    }

    res.status(403).send({
      success: 'error',
      message: 'Incorrect username or password',
    });
  }
}

export default UserController;
