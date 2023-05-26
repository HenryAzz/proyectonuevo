import { Router } from "express";
import { getProp, postProp, deleteProp, postPropBulk, putProp, getPropById } from "./pController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.get("/", getProp);

router.get("/:id", getPropById);

router.post("/", postProp);

router.post("/bulk", postPropBulk); //Ruta para llenar la BD con propiedades de prueba

router.delete("/:id", deleteProp);

router.put("/:id", putProp);

export default router;
