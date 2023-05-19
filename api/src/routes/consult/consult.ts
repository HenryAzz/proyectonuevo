import { Router } from "express";
import { getCons, getCon, postCon } from "./cController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.get("/", getCons);
router.get("/:id", getCon);
router.post("/", postCon);

export default router;
