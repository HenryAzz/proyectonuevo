import {Response, Request, Router} from 'express';
import { getBrokersHandler, createBrokerHandler, getBrokerByIdHandler } from './brokerHandler';
const router = Router();

router.get('/', getBrokersHandler);

router.get('/:id', getBrokerByIdHandler)

router.post('/', createBrokerHandler);

export default router;