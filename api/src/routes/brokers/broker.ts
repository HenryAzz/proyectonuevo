import {Response, Request, Router} from 'express';
import { getBrokersHandler, createBrokerHandler } from './brokerHandler';
const router = Router();

router.get('/', getBrokersHandler);

router.post('/', createBrokerHandler);

export default router;