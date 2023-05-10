import { sequelize } from "../../db";
import { MailService } from "../../services/mailerService";
import updateSignalTemplate from "../../templates/updateSignalTemplate";

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

  let user = await User.findOne({ where: { id: signal.dataValues.userId } });
  let property = await Property.findOne({ where: { id: signal.dataValues.propertyId } });

  let operation = signal.dataValues.operation === "Venta" ? "Vender" : "Compar o Alquilar";

  //ENVIAR EMAIL A USUARIO
  const emailTemplate = updateSignalTemplate(user.dataValues.name, property, situation, operation);
  let sendmail = await MailService(
      user.dataValues.email, 
      "Respuesta de solicitud de Propiedad - PropTech", 
      emailTemplate.html
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
