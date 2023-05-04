import { json } from "../../../jsonejemplo";
import { sequelize } from "../../db";
import { Op } from "sequelize";

const { Property } = sequelize.models;

// HELPER GET //
export const findProps = async function () {
  const db = await Property.findAll();
  if (db.length < 1) {
    const props = json.map(async (prop) => {
      await Property.create(prop);
    });

    return json;
  }
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
