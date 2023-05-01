// const { Broker } = require('../../db'); //importo el modelo
import { sequelize } from "../../db";
import { Op } from "sequelize";

const {Broker} = sequelize.models

//funcion que obtiene todos los brokers de la db
export const getBrokers = async () => {
    const brokers = await Broker.findAll();
    return brokers;
}

//funcion que busca un broker por ID

//Funcion que crea un nuevo broker o Admin
export const createBroker = (id:number, rol:string, email:string, name:string, avatar:string, password:string) =>{
    const newBroker = Broker.create({id, rol, email, name, avatar, password})
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
    return broker[0];
}