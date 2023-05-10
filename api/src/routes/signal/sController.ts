import { Response, Request } from "express";
import {
  getAllSignals,
  getSignal,
  putSignal,
  searchOperationSignal,
  searchSituationSignal,
} from "./sHelper";
import { sequelize } from "../../db";
import { MailService } from "../../services/mailerService";
import clientSignalTemplate from "../../templates/clientSignalTemplate";
import supplierSignalTemplate from "../../templates/supplierSignalTemplate";

//Traemos la tabla de nuestra DB.
const { Signal, Property, Broker, User } = sequelize.models;

//  GET AND FILTERS SIGNALS  //
export const getProps = async (req: Request, res: Response) => {
  const { operation, situation } = req.query;
  try {
    if (operation || situation) {
      let result = operation
        ? await searchOperationSignal(operation)
        : await searchSituationSignal(situation);
      res.status(200).send(result);
    } else {
      const signals = await getAllSignals();
      return res.status(200).json(signals);
    }
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

//  GET SIGNAL  //
export const getProp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let result = await getSignal(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

//  POST SIGNAL  //
export const postProp = async (req: Request, res: Response) => {
  try {
    const newSignal = await Signal.create(req.body);
    const updateProperty = await Property.update(
      {
        situation: "Reservado",
      },
      {
        where: { id: req.body.propertyId },
      }
    );

    let user = await User.findOne({ where: { id: req.body.userId } });
    let property = await Property.findOne({ where: { id: req.body.propertyId } });

    //ENVIAR EMAIL A USUARIO
    const emailTemplate = user.dataValues.rol === "Cliente" ? clientSignalTemplate(user.dataValues.name, property) : supplierSignalTemplate(user.dataValues.name, property);

    let sendmail = await MailService(user.dataValues.email, "Registro de solicitud de Propiedad - PropTech", emailTemplate.html
    );

    res.send({ msj: "Signal Creado correctamente" });
  } catch (error) {
    res.status(404).send(error);
  }
};

//  PUT SIGNAL  //
export const putProp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { situation } = req.body;

    const updateSignal = await putSignal(id, situation);

    res.send({ msj: "Signal Actualizado correctamente" });
  } catch (error) {
    res.status(404).send(error);
  }
};
