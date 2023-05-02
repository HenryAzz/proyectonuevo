import {Response, Request, Router} from 'express';
import { getBrokersHandler, createBrokerHandler, getBrokerByIdHandler, deleteBrokerHandler } from './bHandler';
const router = Router();

router.get('/', getBrokersHandler);

router.get('/:id', getBrokerByIdHandler)

router.post('/', createBrokerHandler);

router.delete('/:id', deleteBrokerHandler)

export default router;