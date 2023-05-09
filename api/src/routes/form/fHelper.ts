//Funciones que se conectan con la DB y obtienen la informacion

import { sequelize } from "../../db";
const { Form } = sequelize.models;
import { Op } from "sequelize";

//GET FORM (FILTERS)
export const gForm = async function (
  id,
  title,
  description,
  picture_url,
  unit_price,
  dni,
  tel,
  type_prop,
  type_vivienda,
  Address,
  Apartment,
  Floor,
  Location,
  province,
  postalCode
) {
  const db = await Form.findAll({
    where: queryForm(
      id,
      title,
      description,
      picture_url,
      unit_price,
      dni,
      tel,
      type_prop,
      type_vivienda,
      Address,
      Apartment,
      Floor,
      Location,
      province,
      postalCode
    ),
    attributes: [
      "id",
      "title",
      "description",
      "picture_url",
      "unit_price",
      "dni",
      "tel",
      "type_prop",
      "type_vivienda",
      "Address",
      "Apartment",
      "Floor",
      "Location",
      "province",
      "postalCode",
    ],
    order: [["id", "ASC"]],
  });

  return db;
};

export const queryForm = (
  id,
  title,
  description,
  picture_url,
  unit_price,
  dni,
  tel,
  type_prop,
  type_vivienda,
  Address,
  Apartment,
  Floor,
  Location,
  province,
  postalCode
): any => {
  let query = {};

  if (id) {
    query = {
      ...query,
      id: { [Op.eq]: id },
    };
  }

  if (title) {
    query = {
      ...query,
      title: { [Op.eq]: title },
    };
  }

  if (description) {
    query = {
      ...query,
      description: { [Op.eq]: description },
    };
  }

  if (picture_url) {
    query = {
      ...query,
      picture_url: { [Op.eq]: picture_url },
    };
  }

  if (dni) {
    query = {
      ...query,
      dni: { [Op.eq]: dni },
    };
  }

  if (tel) {
    query = {
      ...query,
      tel: { [Op.eq]: tel },
    };
  }

  if (type_prop) {
    query = {
      ...query,
      type_prop: { [Op.eq]: type_prop },
    };
  }

  if (type_vivienda) {
    query = {
      ...query,
      type_vivienda: { [Op.eq]: type_vivienda },
    };
  }

  if (Address) {
    query = {
      ...query,
      Address: { [Op.eq]: Address },
    };
  }

  if (Apartment) {
    query = {
      ...query,
      Apartment: { [Op.eq]: Apartment },
    };
  }

  if (Floor) {
    query = {
      ...query,
      Floor: { [Op.eq]: Floor },
    };
  }

  if (Location) {
    query = {
      ...query,
      Location: { [Op.eq]: Location },
    };
  }

  if (province) {
    query = {
      ...query,
      province: { [Op.eq]: province },
    };
  }

  if (postalCode) {
    query = {
      ...query,
      postalCode: { [Op.eq]: postalCode },
    };
  }

  return query;
};

//CREAR FORM (OPERACION)
export const createForm = (date) => {
  const newForm = Form.create(date);
  return newForm;
};

//GET ID FORM
export const idForm = async (id: number) => {
  const form = await Form.findAll({
    where: {
      id: { [Op.eq]: id },
    },
    attributes: [
      "id",
      "title",
      "description",
      "picture_url",
      "unit_price",
      "dni",
      "tel",
      "type_prop",
      "type_vivienda",
      "Address",
      "Number",
      "Apartment",
      "Floor",
      "Location",
      "province",
      "postalCode",
    ],
  });
  const resp = form[0] ? form : `Operación con id ${id} no encontrado`;
  return resp;
};

//DELETE ID FORM
export const dForm = async (id: number) => {
  const form = await Form.destroy({
    where: {
      id: { [Op.eq]: id },
    },
  });
  const resp =
    form === 1
      ? `Operación con id ${id} borrado con Éxito.`
      : `Operación con id ${id} no encontrado.`;
  return resp;
};

//  PUT FORM
export const pForm = async (id, put) => {
  const updateForm = await Form.update(
    {
      put,
    },
    {
      where: { id: id },
    }
  );
  return updateForm;
};
