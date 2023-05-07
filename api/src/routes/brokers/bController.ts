//Funciones que se conectan con la DB y obtienen la informacion

import { sequelize } from "../../db";
import { Op } from "sequelize";

const {Broker} = sequelize.models

//funcion que obtiene todos los brokers de la db
export const getBrokers = async () => {
    const brokers = await Broker.findAll();
    return brokers;
}

//Funcion que crea un nuevo broker o Admin
export const createBroker = (body) =>{
    console.log(body);
    const newBroker = Broker.create(body)
    return newBroker;
}

//Funcion que obtiene un Broker por medio de su ID
export const getBrokerById = async (id:number) => {
    const broker = await Broker.findAll({
        where:{
            id: {[Op.eq]: id}
        },
        attributes:['id', 'rol', 'email', 'name', 'avatar']
    });
    const resp = broker[0] ? broker : `Broker con id ${id} no encontrado`
    return resp;
}

//Funcion que borra un Broker por medio de su id
export const deleteBroker = async (id:number) => {
    const broker = await Broker.destroy({
        where:{
            id: {[Op.eq]: id}
        }
    });
    const resp = broker === 1 ? `Broker con id ${id} borrado con Éxito` : `Broker con id ${id} no encontrado`
    return resp;
}

//Funcion que modifica un Broker
export const modifyBroker = () => {
    
}