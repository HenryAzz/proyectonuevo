import { Router } from "express";
import { getProp, postProp, deleteProp, postPropBulk, putProp } from "./pController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.get("/", getProp);

router.post("/", postProp);

router.put("/", putProp);

router.delete("/:id", deleteProp);
router.post("/bulk", postPropBulk); //Ruta para llenar la BD con propiedades de prueba

export default router;
