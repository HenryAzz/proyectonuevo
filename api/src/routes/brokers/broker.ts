import { Response, Request, Router } from "express";
import { createBrokerHandler, getBrokerByIdHandler, deleteBrokerHandler, getBrokersHandler, modifyBrokerHandler } from "./bHandler";
const router = Router();

router.get("/:id", getBrokerByIdHandler);

router.post("/", createBrokerHandler);

router.get("/", getBrokersHandler)

router.delete("/:id", deleteBrokerHandler);

router.put('/', modifyBrokerHandler)

export default router;
