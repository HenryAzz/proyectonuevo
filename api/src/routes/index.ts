import {Router} from 'express';
import routesUser from './user/user';
import routesBroker from './brokers/broker';
import routesProperty from './property/pRoot';
import routesSignal from './signal/signal';

const router = Router();

router.use('/user', routesUser);

router.use('/broker', routesBroker);

router.use('/property', routesProperty);

router.use('/signal', routesSignal);


export default router;