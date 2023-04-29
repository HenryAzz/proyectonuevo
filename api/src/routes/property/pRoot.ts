import { Router } from "express";
import { getProp, postProp } from "./pController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();


router.get("/", getProp);
    
router.post("/", postProp);

export default router;
