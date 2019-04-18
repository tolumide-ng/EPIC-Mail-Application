import express from 'express';
import UserController from '../../controllers/userController';
import ValidateUser from '../../validations/ValidateUser';
import { checkToken } from '../../../middleware';

const user = express.Router();

user.post('/signup', ValidateUser.userInput, UserController.createUser);
user.post('/login', ValidateUser.userInputLogin, UserController.login);
user.patch('/users/upload', checkToken, UserController.imageUpload);

export default user;
