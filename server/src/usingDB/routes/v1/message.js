import express from 'express';
import Epicmail from '../../../controllers/controller';
import { checkToken } from '../../../middleware';

const message = express.Router();


message.post('/', checkToken, Epicmail.sendMessage);
message.get('/', checkToken, Epicmail.getAllMessagesPerUser);
message.get('/:id', checkToken, Epicmail.getAMessage);
message.get('/unread', checkToken, Epicmail.getUnreadMessagesPerUser);
message.get('/sent', checkToken, Epicmail.getMessagesSentByAUser);
message.delete('/:id', checkToken, Epicmail.deleteAMessage);
export default message;
