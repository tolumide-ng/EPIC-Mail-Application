import express from 'express';
import GroupController from '../../controllers/GroupController';
import { checkToken } from '../../../middleware';
import ValidateGroup from '../../validations/ValidateGroup';
import ValidateUserGroup from '../../validations/ValidateUserGroup';
import ValidateMessage from '../../validations/ValidateMessage';

const group = express.Router();


group.post('/', checkToken, ValidateGroup.groupInput, GroupController.createGroup);
group.post('/:id/users', checkToken, ValidateUserGroup.groupInput, GroupController.createUserGroup);
group.delete('/:id', checkToken, GroupController.deleteAGroup);
group.delete('/:group/user/:user', checkToken, GroupController.deleteUserInGroup);
group.post('/:id/messages', checkToken, ValidateMessage.messageInput, GroupController.sendGroupMessage);
group.get('/', checkToken, GroupController.getAllGroups);
group.get('/:id/users', checkToken, GroupController.getAllUserGroups);
group.get('/users', checkToken, GroupController.getMemberGroups);
group.get('/:id/messages', checkToken, GroupController.getAllGroupMessages);
group.get('/:id/messages/:messageId', checkToken, GroupController.getAGroupMessages);
group.get('/:id', checkToken, GroupController.getAGroup);

export default group;
