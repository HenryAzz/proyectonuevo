import { Router } from "express";
import { getProp, postProp, deleteProp, getPropId /* getType */ } from "./pController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.get("/", getProp);

router.get("/:id", getPropId);

//router.get("/:types", getType);

router.post("/", postProp);

router.delete("/:id", deleteProp);

export default router;
