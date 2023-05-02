import { Response, Request, Router } from "express";
import { createBrokerHandler, getBrokerByIdHandler, deleteBrokerHandler } from "./bHandler";
const router = Router();

router.get("/:id", getBrokerByIdHandler);

router.post("/", createBrokerHandler);

router.delete("/:id", deleteBrokerHandler);

export default router;
