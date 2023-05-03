import { Response, Request, Router } from "express";
const router = Router();

import { getProps, getProp, postProp, putProp } from "./sController";

router.get("/", getProps);
router.get("/:id", getProp);
router.put("/:id", putProp);
router.post("/", postProp);

export default router;
