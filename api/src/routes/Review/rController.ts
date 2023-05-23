import { Response, Request } from "express";
import { sequelize } from "../../db";
import { getReviewsHelper, createReviewHelper, deleteReviewHelper } from "./rHelper";

//Controller para traer todos los reviews
export const getReviewsController = async (req:Request, res:Response) => {
  try {
    const reviews = await getReviewsHelper();
    res.status(200).json(reviews)
  } catch (error:any) {
    res.status(404).json({error:error.message})
  }
}

export const createReviewController = async (req:Request, res:Response) =>{
  const {target, grade, message} = req.body
  try {
    const newReview = await createReviewHelper(target, grade, message);
    res.status(200).json({msg:'creado con exito', newReview})
  } catch (error:any) {
    res.status(404).json({error:error.message})
  }
}

export const deleteReviewController = async (req:Request, res:Response) => {
  const {id} = req.params;
  try {
    const delReview = await deleteReviewHelper(id);
    res.status(200).json(delReview)
  } catch (error:any) {
    res.status(404).json({error:error.message})
  }
}