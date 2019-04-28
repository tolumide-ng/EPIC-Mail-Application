import express from 'express';
import UserController from '../../controllers/userController';
import ValidateUser from '../../validations/ValidateUser';
import { checkToken } from '../../../middleware';

const user = express.Router();

user.post('/signup', ValidateUser.userInput, UserController.createUser);
user.post('/login', ValidateUser.userInputLogin, UserController.login);
user.get('/reset', UserController.validateResetToken);
user.post('/reset', ValidateUser.userInputSendReset, UserController.sendResetLink);
user.patch('/reset', ValidateUser.userInputResetPassword, UserController.resetPassword);
user.patch('/users/upload', ValidateUser.imageInput, checkToken, UserController.imageUpload);
user.get('/users/profile', checkToken, UserController.getAProfileImage);
user.put('/users/profile', checkToken, ValidateUser.profileInfo, UserController.updateProfile);

export default user;
