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
};

export default Model;