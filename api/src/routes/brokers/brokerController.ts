// const { Broker } = require('../../db'); //importo el modelo
import { sequelize } from "../../db";

const {Broker} = sequelize.models

//funcion que obtiene todos los brokers de la db
export const getBrokers = async () => {
    const brokers = await Broker.findAll();
    return brokers;
}

export const createBroker = (id:number, rol:string, email:string, name:string, person_type:string, avatar:string, password:string) =>{
    const newBroker = Broker.create({id, rol, email, name, person_type, avatar, password})
    return newBroker;
}