import { Router } from "express";
const router = Router();

import { getFavs, getFav, postFav, deleteFav } from "./fController";

router.get("/", getFavs);
router.get("/:id", getFav);
router.delete("/:id", deleteFav);
router.post("/", postFav);

export default router;
