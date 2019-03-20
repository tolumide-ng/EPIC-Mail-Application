import express from 'express';
import UserController from '../../controllers/userController';

const user = express.Router();


user.post('/signup', UserController.createUser);
user.post('/login', UserController.login);

export default user;
