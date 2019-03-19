import express from 'express';
import epicWithDB from '../../controllers';

const user = express.Router();


user.post('/signup', epicWithDB.createUser);
user.post('/login', epicWithDB.login);

export default user;
