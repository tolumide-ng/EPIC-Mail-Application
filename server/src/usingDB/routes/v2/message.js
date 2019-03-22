import express from 'express';
import MessageController from '../../controllers/MessageController';
import { checkToken } from '../../../middleware';

const message = express.Router();

message.post('/', checkToken, MessageController.sendMessage);
message.get('/unread', checkToken, MessageController.getUnreadMessages);
message.get('/', checkToken, MessageController.getAllMessagesPerUser);
message.get('/sent', checkToken, MessageController.getMessagesSentByAUser);
message.get('/:id/sent', checkToken, MessageController.getASentMessage);
message.get('/:id', checkToken, MessageController.getAMessage);
message.delete('/:id', checkToken, MessageController.deleteAMessage);
message.delete('/:id/retract', checkToken, MessageController.retractEmail);

export default message;
