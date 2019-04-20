import express from 'express';
import UserController from '../../controllers/userController';
import ValidateUser from '../../validations/ValidateUser';
import { checkToken } from '../../../middleware';

const user = express.Router();

user.post('/signup', ValidateUser.userInput, UserController.createUser);
user.post('/login', ValidateUser.userInputLogin, UserController.login);
user.patch('/users/upload', ValidateUser.imageInput, checkToken, UserController.imageUpload);
user.get('/users/profile', checkToken, UserController.getAProfileImage);

export default user;
