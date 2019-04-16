import express from 'express';
import UserController from '../../controllers/userController';
import ValidateUser from '../../validations/ValidateUser';
import { checkToken } from '../../../middleware';
import { multerUploads } from '../../../middleware/multer';

const user = express.Router();

user.post('/signup', ValidateUser.userInput, UserController.createUser);
user.post('/login', ValidateUser.userInputLogin, UserController.login);
user.post('/users/upload/picture', checkToken, multerUploads, UserController.imageUpload);

export default user;
