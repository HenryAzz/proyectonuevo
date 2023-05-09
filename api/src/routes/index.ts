import { Router } from "express";
import routesUser from "./user/uRoot";
import routesBroker from "./brokers/broker";
import routesProperty from "./property/pRoot";
import routesSignal from "./signal/signal";
import routesForm from "./form/fRoot";
// import routesMessage from "./message/message"
const router = Router();

router.use("/user", routesUser);

router.use("/broker", routesBroker);

router.use("/property", routesProperty);

router.use("/signal", routesSignal);

router.use("/form", routesForm);

// router.use('/message', routesMessage)

export default router;
