import { sequelize } from "../../db";

const { Consult, User } = sequelize.models;

// HELPER GET CONSULTS //
export const getAllConsults = async function () {
  return await Consult.findAll({
    include: [User],
  });
};

// HELPER GET CONSULT //
export const getConsult = async function (id) {
  const consult = await Consult.findOne({
    include: [User],
    where: { id: id },
  });

  return consult ? consult : `Consulta con id ${id} no encontrada`;
};
