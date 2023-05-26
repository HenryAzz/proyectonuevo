import { Router } from "express";
import { getForm, getFormId, postForm, deleteForm, putForm } from "./fController";

//Router es una funcion de express que permite crear "modulos" de rutas para una misma ruta (index.ts)
const router = Router();

router.get("/", getForm);

router.get("/:id", getFormId);

router.post("/", postForm);

router.delete("/:id", deleteForm);

router.put("/", putForm);

export default router;
