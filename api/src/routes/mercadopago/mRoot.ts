import { Router } from "express";

import { createOrder, getPayment, createOrderSignal, postWebHooks } from "./mController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.post("/", createOrder);
router.post("/signal", createOrderSignal)
router.post("/payment", getPayment)
router.post("webhooks", postWebHooks )

export default router;
