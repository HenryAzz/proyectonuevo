import { Response, Request, Router } from "express";
import {
  createBrokerHandler, 
  getBrokerByEmailHandler, 
  deleteBrokerHandler, 
  getBrokersHandler, 
  modifyBrokerHandler, 
  statisticsHandler,
  getBrokerByIdHandler } from "./bHandler";
const router = Router();

router.get("/statistics", statisticsHandler)

router.get("/", getBrokersHandler)

router.get("/:email", getBrokerByEmailHandler);

router.get('/:id', getBrokerByIdHandler)

router.post("/", createBrokerHandler);

router.put('/', modifyBrokerHandler);

router.delete("/:id", deleteBrokerHandler);

export default router;
