import { Response, Request } from "express";
import {
  getAllConsults,
  getConsult,
} from "./cHelper";
import { sequelize } from "../../db";

//Traemos la tabla de nuestra DB.
const { Consult } = sequelize.models;

//  GET CONSULTS  //
export const getCons = async (req: Request, res: Response) => {
  try {
    const consults = await getAllConsults();
    return res.status(200).json(consults);
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

//  GET SIGNAL  //
export const getCon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let result = await getConsult(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

//  POST SIGNAL  //
export const postCon = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newConsult = await Consult.create(req.body);

    res.send({ msj: "Consulta Creado correctamente" });
  } catch (error) {
    res.status(404).send(error);
  }
};