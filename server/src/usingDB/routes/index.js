import express from 'express';
import routerV1 from './v1';
import routerV2 from './v2';

const router = express.Router();
router.use('/api/v1', routerV1);
router.use('/api/v2', routerV2);
export default router;
