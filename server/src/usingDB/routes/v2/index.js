import express from 'express';
import user from './user';
import message from './message';
import group from './group';


const routerV2 = express.Router();
routerV2.use('/auth', user);
routerV2.use('/messages', message);
routerV2.use('/groups', group);

export default routerV2;
