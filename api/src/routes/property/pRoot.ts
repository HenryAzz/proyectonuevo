import { Router } from "express";
import { getProp, postProp, deleteProp } from "./pController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.get("/", getProp);

router.post("/", postProp);

router.delete("/:id", deleteProp);

export default router;
