import { sequelize } from "../../db";

const { Signal, Property, Broker, User } = sequelize.models;

// HELPER GET //
export const getAllSignals = async function () {
  return await Signal.findAll({
    include: [Property, Broker, User],
  });
};

// HELPER PUT //
export const putSignal = async function (id, situation) {
  const updateSignal = await Signal.update(
    {
      situation: situation,
    },
    {
      where: { id: id },
    }
  );

  let signal = await Signal.findOne({ where: { id: id } });
  let statusProperty = "";

  if (signal.dataValues.operation === "Venta") {
    situation === "Aceptado" ? (statusProperty = "Vendido") : (statusProperty = "Disponible");
  } else if (signal.dataValues.operation === "Alquiler") {
    situation === "Aceptado" ? (statusProperty = "Rentado") : (statusProperty = "Disponible");
  }

  const updateProperty = await Property.update(
    {
      situation: statusProperty,
    },
    {
      where: { id: signal.dataValues.propertyId },
    }
  );

  return updateSignal;
};
