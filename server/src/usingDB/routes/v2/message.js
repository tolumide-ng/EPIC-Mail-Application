import express from 'express';
import MessageController from '../../controllers/MessageController';
import { checkToken } from '../../../middleware';
import ValidateUser from '../../validations/ValidateMessage';

const message = express.Router();

message.post('/', checkToken, ValidateUser.messageInput, MessageController.sendMessage);
message.post('/timed', checkToken, ValidateUser.messageInput, ValidateUser.timeMessageInput, MessageController.composeTimedMessage);
message.get('/unread', checkToken, MessageController.getUnreadMessages);
message.get('/', checkToken, MessageController.getAllMessagesPerUser);
message.get('/sent', checkToken, MessageController.getMessagesSentByAUser);
message.get('/draft', checkToken, MessageController.getDraftMessages);
message.get('/specific/:id', checkToken, MessageController.fetchMessageById);
message.get('/:id/sent', checkToken, MessageController.getASentMessage);
message.get('/:id/draft', checkToken, MessageController.getADraftMessage);
message.put('/:id/draft', checkToken, MessageController.updateADraftMessage);
message.get('/:id', checkToken, MessageController.getAMessage);
message.delete('/multiple/', checkToken, MessageController.deleteMultipleMessages);
message.delete('/:id', checkToken, MessageController.deleteAMessage);
message.delete('/:id/retract', checkToken, MessageController.retractEmail);
message.delete('/draft/:id', checkToken, MessageController.deleteADraftMessage);

export default message;
