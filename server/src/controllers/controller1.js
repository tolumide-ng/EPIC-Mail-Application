/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable no-else-return */
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/model1';

const Model = {
    createAUser(req, res) {
        const email = req.body.email;
        if (!email || !req.body.firstName || !req.body.lastName || !req.body.password) {
          return res.status(400).send({ message: 'All fields are required' });
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
};