//Funciones que manejan la request y los errores. Llaman a la fcn que se encarga de traer la Info

import { Response, Request } from "express";
import { getBrokers, 
    createBroker, 
    getBrokerByEmail, 
    deleteBroker, 
    modifyBroker, 
    statisticsController, 
    getBrokerById}  from './bController';

export const getBrokersHandler = async (req:Request , res:Response) =>{
    try {
        const brokers = await getBrokers();
        return res.status(200).json(brokers);
    } catch (error:any) {
        return res.status(404).send({error: error.message})
    }
}

export const getBrokerByEmailHandler = async (req:Request , res:Response) =>{
    let {email} = req.params;
    try {
        const newbroker = await getBrokerByEmail(email);
        return res.status(200).json(newbroker);
    } catch (error:any) {
        return res.status(404).send({error:error.message})
    }
}

export const getBrokerByIdHandler = async (req:Request , res:Response) =>{
    let {id} = req.params;
    let numId = Number(id)
    try {
        const newbroker = await getBrokerById(numId);
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

//Modifica los datos de un broker recibiendo por query los campos a cambiar 
export const modifyBrokerHandler = async (req:Request , res:Response) => {
    const { division, id } = req.body;
    try {
        const modBroker = await modifyBroker(id, division);
        res.status(200).json(modBroker);
    } catch (error:any) {
        return res.status(404).send({error:error.message})
    }
}

export const statisticsHandler = async (req:Request , res:Response) => {
    const { id } = req.query
    console.log(id);
    try {
        const statistics = await statisticsController(id);
        res.status(200).json(statistics);
    } catch (error:any) {
        res.status(404).send({error:error.message})
    }
}