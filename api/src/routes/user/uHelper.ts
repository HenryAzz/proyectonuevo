import { sequelize } from "../../db";

const { User } = sequelize.models;

// findUser
export const findUser = async function () {
  const db = await User.findAll();
  return db;
};

//findUserRol
export const findUserRol = async function (rol: string) {
  const db = await User.findAll({
    where: {
      rol: rol,
    },
  });

  return db;
};

//findUserByRolPersonType
export const findUserByRolPersonType = async function (
  rol: string,
  person_type: string
) {
  const db = await User.findAll({
    where: {
      rol: rol,
      person_type: person_type,
    },
  });

  return db;
};

//findUserPerson_type
export const findUserPerson_type = async function (person_type: string) {
  const db = await User.findAll({
    where: {
      person_type: person_type,
    },
  });

  return db;
};
