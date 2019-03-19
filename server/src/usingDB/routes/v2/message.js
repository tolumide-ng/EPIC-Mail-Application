import express from 'express';
import epicWithDB from '../../controllers';
import { checkToken } from '../../../middleware';

const message = express.Router();


message.post('/', checkToken, epicWithDB.sendMessage);
message.get('/unread', checkToken, epicWithDB.getUnreadMessages);
message.get('/', checkToken, epicWithDB.getAllMessagesPerUser);
message.get('/sent', checkToken, epicWithDB.getMessagesSentByAUser);
message.get('/:id', checkToken, epicWithDB.getAMessage);
message.delete('/:id', checkToken, epicWithDB.deleteAMessage);

export default message;
