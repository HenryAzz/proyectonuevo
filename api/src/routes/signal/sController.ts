import { Response, Request } from "express";
import { getAllSignals, putSignal } from "./sHelper";
import { sequelize } from "../../db";

//Traemos la tabla de nuestra DB.
const { Signal, Property, Broker, User } = sequelize.models;

//  GET SIGNALS  //
export const getProps = async (req: Request, res: Response) => {
  try {
    const signals = await getAllSignals();
    console.log(signals);
    return res.status(200).json(signals);
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

//  GET SIGNAL  //
export const getProp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const signal = await Signal.findOne({
      include: [Property, Broker, User],
      where: { id: id },
    });
    console.log(signal);
    return res.status(200).json(signal);
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
    console.log(updateSignal);
    res.send({ msj: "Signal Actualizado correctamente" });
  } catch (error) {
    res.status(404).send(error);
  }
};
