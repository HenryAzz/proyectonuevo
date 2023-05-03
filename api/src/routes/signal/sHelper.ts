import { sequelize } from "../../db";

const { Signal, Property, Broker, User } = sequelize.models;

// HELPER GET SIGNALS //
export const getAllSignals = async function () {
  return await Signal.findAll({
    include: [Property, Broker, User],
  });
};

// HELPER GET SIGNAL //
export const getSignal = async function (id) {
  const signal = await Signal.findOne({
    include: [Property, Broker, User],
    where: { id: id },
  });

  return signal ? signal : `Signal con id ${id} no encontrado`;
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

// FILTER OPERATION
export const searchOperationSignal = async function (operation) {
  // Llamo a la función que trae todas las señas
  const signals = await getAllSignals();

  // Filter Signals por Operación
  const filteredSignals = signals.filter((signal) => signal.dataValues.operation === operation);

  return filteredSignals
    ? filteredSignals
    : `No se encontró ninguna Seña con el Tipo de Operación: ${operation} `;
};

// FILTER SITUATION
export const searchSituationSignal = async function (situation) {
  // Llamo a la función que trae todas las señas
  const signals = await getAllSignals();

  // Filter Signals por Operación
  const filteredSignals = signals.filter((signal) => signal.dataValues.situation === situation);

  return filteredSignals
    ? filteredSignals
    : `No se encontró ninguna Seña en Situación: ${situation} `;
};
