import express from 'express';
import Epicmail from '../../../controllers/controller';

const user = express.Router();


user.post('/signup', Epicmail.createAUser);
user.post('/login', Epicmail.login);
export default user;
