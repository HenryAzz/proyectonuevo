import { Response, Request, Router } from "express";
import { createBrokerHandler, getBrokerByIdHandler, deleteBrokerHandler, getBrokersHandler } from "./bHandler";
const router = Router();

router.get("/:id", getBrokerByIdHandler);

router.post("/", createBrokerHandler);

router.get("/", getBrokersHandler)

router.delete("/:id", deleteBrokerHandler);

export default router;
