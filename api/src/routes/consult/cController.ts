import { Response, Request } from "express";
import {
  getAllConsults,
  getConsult,
} from "./cHelper";
import { sequelize } from "../../db";

const { User } = sequelize.models;

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
    const { name, email, issue, description } = req.body;
    let user = await User.findOne({ where: { email: email } });

    if(user){
      const newConsult = await Consult.create({
        issue: issue,
        description: description,
        userId: user.dataValues.id
      });
      res.send({ state: 1, msj: "Consulta Creado correctamente" });
    }else{
      res.send({ state: 0, msj: "El email proporcionado no está registrado en nuestro sistema" });
    }
      
  } catch (error) {
    res.status(404).send(error);
  }
};