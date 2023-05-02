import { Response, Request } from "express";

const { getBrokers } = require("./brokerController");
import { sequelize } from "../../db";
const { Broker } = sequelize.models;

export const getBrokersHandler = async (req: Request, res: Response) => {
  try {
    const brokers = await getBrokers();
    return res.status(200).json(brokers);
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

export const getBrokerByIdHandler = async (req: Request, res: Response) => {};

export const createBrokerHandler = async (req: Request, res: Response) => {
  //   const { id, rol, email, name, person_type, avatar, password } = req.body;
  try {
    const newBroker = await Broker.create(req.body);
    // const newBroker = await createBroker(id, rol, email, name, person_type, avatar, password);
    return res.status(200).json(newBroker);
  } catch (error: any) {
    console.log(error.message);
    return res.status(404).send({ error: error.message });
  }
};

import { getBrokers, createBroker, getBrokerById}  from './brokerController';

export const getBrokersHandler = async (req:Request , res:Response) =>{
    try {
        const brokers = await getBrokers();
        return res.status(200).json(brokers);
    } catch (error:any) {
        return res.status(404).send({error: error.message})
    }
}

export const getBrokerByIdHandler = async (req:Request , res:Response) =>{
    let {id} = req.params;
    const idNum:number = Number(id)
    try {
        const newbroker = await getBrokerById(idNum);
        return res.status(200).json(newbroker);
    } catch (error:any) {
        return res.status(404).send({error:error.message})
    }
}

export const createBrokerHandler = async (req:Request , res:Response) =>{
    const {id, rol, email, name, person_type, avatar, password} = req.body;
    try {
        const newBroker = await createBroker(id, rol, email, name, avatar, password);
        return res.status(200).json(newBroker);
    } catch (error:any) {
        return res.status(404).send({error:error.message})
    }
}

