/* eslint-disable no-console */
import '@babel/polyfill';
/* eslint-disable import/no-extraneous-dependencies */
/* credit: Olawale Aladeusi */
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import env from 'dotenv';
import Epicmail from './src/controllers/controller';
// for API documentation
import swaggerDocument from '../swagger.json';
// import check token through destructuring
import { checkToken } from './src/middleware';
// this allows cross platform stuff
// this allows u to use enviromental variables

import epicWithDB from './src/usingDB/controllers';
// to check that the type is db

// initialize .env file for the secret stuff
env.config();

const router = express.Router();
const app = express();
app.use(bodyParser.urlencoded({ // Middleware
  extended: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.use(cors());

app.get('/', (req, res) => res.status(200).send({ message: 'YAY! Congratulations! Your first endpoint is working' }));
app.post('/api/v1/auth/signup', Epicmail.createAUser);
app.post('/api/v1/auth/login', Epicmail.login);
app.post('/api/v1/messages', checkToken, Epicmail.sendMessage);
app.get('/api/v1/messages', checkToken, Epicmail.getAllMessagesPerUser);
app.get('/api/v1/messages/:id', checkToken, Epicmail.getAMessage);
app.get('/api/v1/messages/unreadMessages', checkToken, Epicmail.getUnreadMessagesPerUser);
app.get('/api/v1/messages/sentMessages', checkToken, Epicmail.getMessagesSentByAUser);
app.get('/api/v1/users/:id', checkToken, Epicmail.getOneUser);
app.delete('/api/v1/messages/:id', checkToken, Epicmail.deleteAMessage);

// version 2...
app.post('/api/v2/auth/signup', epicWithDB.createUser);
app.post('/api/v2/auth/login', epicWithDB.login);
app.post('/api/v2/messages', checkToken, epicWithDB.sendMessage);
app.get('/api/v2/messages/unread', checkToken, epicWithDB.getUnreadMessages);
app.get('/api/v2/messages', checkToken, epicWithDB.getAllMessagesPerUser);
app.get('/api/v2/messages/sent', checkToken, epicWithDB.getMessagesSentByAUser);
app.get('/api/v2/messages/:id', checkToken, epicWithDB.getAMessage);
app.delete('/api/v2/messages/:id', checkToken, epicWithDB.deleteAMessage);
app.post('/api/v2/groups', checkToken, epicWithDB.createGroup);
app.post('/api/v2/groups/users', checkToken, epicWithDB.createUserGroup);
app.delete('/api/v2/groups/:id', checkToken, epicWithDB.deleteAGroup);
app.delete('/api/v2/groups/user/:group/:user', checkToken, epicWithDB.deleteUserInGroup);
app.post('/api/v2/messages/group', checkToken, epicWithDB.sendGroupMessage);

/* when the function is called, it should listen on a port */
/* To automatically pick port on the server instead of usin a single port */
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on ${port}`));

export default app;
