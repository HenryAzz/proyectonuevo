import { Response, Request, Router } from "express";
import {
  createBrokerHandler, 
  getBrokerByIdHandler, 
  deleteBrokerHandler, 
  getBrokersHandler, 
  modifyBrokerHandler, 
  statisticsHandler } from "./bHandler";
const router = Router();

router.get("/statistics", statisticsHandler)

router.get("/", getBrokersHandler)

router.get("/:id", getBrokerByIdHandler);

router.post("/", createBrokerHandler);

router.put('/', modifyBrokerHandler);

router.delete("/:id", deleteBrokerHandler);

export default router;
