import express from 'express';
import user from './user';
import message from './message';

const routerV1 = express.Router();
routerV1.use('/auth', user);
routerV1.use('/messages', message);

export default routerV1;
