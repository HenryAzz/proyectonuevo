import { Router } from "express";
import {
  getProp,
  postProp,
  deleteProp,
  getPropId,
  postPropBulk /* getType */,
} from "./pController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.get("/", getProp);

router.post("/", postProp);

router.get("/:id", getPropId);

//router.get("/:types", getType);

router.post("/bulk", postPropBulk); //Ruta para llenar la BD con propiedades de prueba

router.delete("/:id", deleteProp);

export default router;
