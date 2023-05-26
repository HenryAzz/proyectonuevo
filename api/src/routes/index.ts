import { Router } from "express";
import routesUser from "./user/uRoot";
import routesBroker from "./brokers/broker";
import routesProperty from "./property/pRoot";
import routesSignal from "./signal/signal";
import routesReview from './Review/review'
import routesForm from "./form/fRoot";

import routesConsult from "./consult/consult";

import routesMercadopago from './mercadopago/mRoot'

import routesMessage from "./messages/message";

import routesFavorites from "./favorites/favorites";

const router = Router();

router.use("/user", routesUser);

router.use("/broker", routesBroker);

router.use("/property", routesProperty);

router.use("/signal", routesSignal);

router.use("/form", routesForm);

router.use("/consult", routesConsult);

router.use("/mercadopago", routesMercadopago);

router.use("/review", routesReview)

router.use('/message', routesMessage);

router.use('/favorites', routesFavorites);

export default router;
