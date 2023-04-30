import { Router } from "express";
import { getUser, postUser } from "./uController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.get("/", getUser);

router.post("/", postUser);

export default router;
