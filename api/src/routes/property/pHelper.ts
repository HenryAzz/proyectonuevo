import { promises } from "dns";
import { json } from "../../../jsonejemplo";
import { sequelize } from "../../db";
import { Op } from "sequelize";


const { Property } = sequelize.models;

const queryCreator = (operation, zone, maxPrice, type, situation):any => {
  let price = Number(maxPrice);
  let query = {};
  if (operation) {
    query = {
      ...query,
      operation: {[Op.eq]: operation}
    }
  }

  if(type){
    query = {
      ...query,
      type: {[Op.eq]:type}
    }
  }

  if (maxPrice) {
    query={
      ...query,
      price: {[Op.between]: [0, price]}
    }
  }

  if (situation) {
    query = {
      ...query,
      situation: {[Op.eq]: situation}
    }
  }

  return query;
}

// HELPER GET //
export const findProps = async function (operation, zone, maxPrice, propertyType, situation) {
  const db = await Property.findAll({
    where: queryCreator(operation, zone, maxPrice, propertyType, situation),
    attributes:['id', 'type', 'address', 'price', 'situation', 'operation'],
    order:[['id','ASC']]
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
export const fillDataBase = async ()  => {
  await Property.bulkCreate(json);
  console.log(`Data Base Loaded with ${json.length} Properties`);
}
