import express from 'express';
import UserController from '../../controllers/userController';
import ValidateUser from '../../validations/ValidateUser';

const user = express.Router();

user.post('/signup', ValidateUser.userInput, UserController.createUser);
user.post('/login', ValidateUser.userInputLogin, UserController.login);

export default user;
