import { Model } from "sequelize";
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
export const findUserByRolPersonType = async function (rol: string, person_type: string) {
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

//////////////////// GOOGLE!

export async function getUserSoloByEmail(comparing) {
  let { email } = comparing;
  console.log("esto es denfro de getUserSoloByEmail", email);
  let userByEmail;
  let emailDataBase = await User.findOne({ where: { email } });
  if (!emailDataBase) {
    userByEmail = await createUser(comparing); //google create
    console.log("esto es userByEmail =>", userByEmail);
  } else {
    const { email, hashgoogle } = comparing;
    // console.log("esto es hashgoogle ==>",hashgoogle)
    userByEmail = User.findOne({
      where: {
        email,
        hashgoogle,
      },
    });
  }
  return userByEmail;
}

/// google create

export default async function createUser({
  name,
  rol,
  email,
  password,
  person_type,
  avatar,
  activity,
  hashgoogle,
}) {
  // console.log("esto es hasgoogle",hashgoogle)

  let creatingUser = await User.create({
    name,
    rol,
    email,
    password,
    person_type,
    avatar,
    activity,
    hashgoogle,
  });

  return creatingUser;
}
