import express from 'express';
import epicWithDB from '../../controllers';
import { checkToken } from '../../../middleware';

const group = express.Router();


group.post('/', checkToken, epicWithDB.createGroup);
group.post('/:id/users', checkToken, epicWithDB.createUserGroup);
group.delete('/:id', checkToken, epicWithDB.deleteAGroup);
group.delete('/:group/user/:user', checkToken, epicWithDB.deleteUserInGroup);
group.post('/:id/messages', checkToken, epicWithDB.sendGroupMessage);

export default group;
