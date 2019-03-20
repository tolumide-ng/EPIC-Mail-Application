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
    const lnameInput = req.body.lastName.replace(/\s/g, ''); console.log(req.body.lastName, lnameInput);
    const pwdInput = req.body.password.trim();
    const fnameInput = req.body.firstName.trim();
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
    if (!fnameInput || fnameInput.length < 3) {
      return res.status(400).send({ message: 'Please enter a valid input.first name is required and has a minimum of 3 characters' });
    }
    if (!lnameInput || lnameInput.length < 3) {
      return res.status(400).send({ message: 'Please enter a valid input.last name is required and has a minimum of 3 characters' });
    }
    if (!pwdInput || pwdInput.length < 6) {
      return res.status(400).send({ message: 'Please enter a valid input.password is required and has a minimum of 6 characters' });
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
      fnameInput,
      lnameInput,
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
      return res.status(500).send('something went wrong with your request');
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
