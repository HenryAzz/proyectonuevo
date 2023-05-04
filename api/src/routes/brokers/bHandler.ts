//Funciones que manejan la request y los errores. Llaman a la fcn que se encarga de traer la Info

import { Response, Request } from "express";
import { getBrokers, createBroker, getBrokerById, deleteBroker, modifyBroker}  from './bController';

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
    try {
        const newBroker = await createBroker(req.body);
        return res.status(200).json(newBroker);
    } catch (error:any) {
        return res.status(404).send({error:error.message})
    }
}

export const deleteBrokerHandler =async (req:Request , res:Response) => {
    let {id} = req.params;
    const idNum:number = Number(id);
    try {
        const brokerDel = await deleteBroker(idNum)
        res.status(200).json(brokerDel)
    } catch (error:any) {
        return res.status(404).send({error:error.message})
    }
}

export const modifyBrokerHandler = () => {
    
}