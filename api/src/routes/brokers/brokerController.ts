// const { Broker } = require('../../db'); //importo el modelo
import { sequelize } from "../../db";

const { Broker } = sequelize.models;

//funcion que obtiene todos los brokers de la db
export const getBrokers = async () => {
  const brokers = await Broker.findAll();
  return brokers;
};

// export const createBroker = (
//   req.body
// ) => {
//   const newBroker = Broker.create(req.body);
//   return newBroker;
// };
