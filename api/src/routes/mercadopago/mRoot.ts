import { Router } from "express";

import { createOrder } from "./mController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.get("/", createOrder);

export default router;
