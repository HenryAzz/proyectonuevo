import { Router } from "express";
const router = Router();

import { postMessage } from "./mController";

router.post("/", postMessage);

export default router;