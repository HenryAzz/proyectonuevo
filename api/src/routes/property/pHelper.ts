import { promises } from "dns";
import { json } from "../../../jsonejemplo";
import { sequelize } from "../../db";
import { Op } from "sequelize";

const { Property } = sequelize.models;

const queryCreator = (operation, rooms, maxPrice, type, situation, area): any => {
  let price = Number(maxPrice);
  let query = {};

  if (rooms) {
    let roomsNum = Number(rooms);
    query = {
      ...query,
      bedroom: { [Op.eq]: roomsNum },
    };
  }

  if (area) {
    let maxArea = Number(area);
    query = {
      ...query,
      total_area: { [Op.between]: [0, maxArea] },
    };
  }

  if (operation) {
    const upperCase = operation.charAt(0).toUpperCase() + operation.slice(1);
    query = {
      ...query,
      operation: { [Op.eq]: upperCase },
    };
  }

  if (type) {
    const upperCase = type.charAt(0).toUpperCase() + type.slice(1);
    query = {
      ...query,
      type: { [Op.eq]: upperCase },
    };
  }

  if (maxPrice) {
    query = {
      ...query,
      price: { [Op.between]: [0, price] },
    };
  }

  if (situation) {
    const upperCase = situation.charAt(0).toUpperCase() + situation.slice(1);
    query = {
      ...query,
      situation: { [Op.eq]: upperCase },
    };
  }

  return query;
};

// HELPER GET //
export const findProps = async function (
  operation,
  rooms,
  maxPrice,
  propertyType,
  situation,
  area
) {
  const db = await Property.findAll({
    where: queryCreator(operation, rooms, maxPrice, propertyType, situation, area),

    //attributes: ["id", "type", "address", "price", "situation", "operation", "pictures"],

    order: [["id", "ASC"]],
  });

  return db;
};

////////Delete Prop

export const deleteP = async (id: number) => {
  const prop = await Property.destroy({
    where: {
      id: { [Op.eq]: id },
    },
  });
  const res =
    prop === 1
      ? `Propiedad con id ${id} borrado con Éxito`
      : `Propiedad con id ${id} no encontrado`;
  return res;
};

//Llenar la Bd con varias casas de prueba
export const fillDataBase = async () => {
  await Property.bulkCreate(json);
  console.log(`Data Base Loaded with ${json.length} Properties`);
};

//Put Property
export const putProperty = async (id, put) => {
  const updateProperty = await Property.update(put, {
    where: { id: id },
  });
  console.log(updateProperty);
  return updateProperty;
};
