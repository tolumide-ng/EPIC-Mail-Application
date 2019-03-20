import express from 'express';
import GroupController from '../../controllers/GroupController';
import { checkToken } from '../../../middleware';

const group = express.Router();


group.post('/', checkToken, GroupController.createGroup);
group.post('/:id/users', checkToken, GroupController.createUserGroup);
group.delete('/:id', checkToken, GroupController.deleteAGroup);
group.delete('/:group/user/:user', checkToken, GroupController.deleteUserInGroup);
group.post('/:id/messages', checkToken, GroupController.sendGroupMessage);
group.get('/', checkToken, GroupController.getAllGroups);

export default group;
