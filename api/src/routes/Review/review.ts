import { Router } from "express";
import { getReviewsController, createReviewController, deleteReviewController } from "./rController";

const router = Router();

router.get('/', getReviewsController);
router.post('/', createReviewController); 
router.delete('/:id', deleteReviewController)

export default router;