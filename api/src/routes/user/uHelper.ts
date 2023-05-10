import { Model } from "sequelize";
import { sequelize } from "../../db";
import { MailService } from "../../services/mailerService";
import { randomBytes } from 'crypto';
import resetPasswordTemplate from "../../templates/resetPasswordTemplate";
import clientUserTemplate from "../../templates/clientUserTemplate";
import supplierUserTemplate from "../../templates/supplierUserTemplate";

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


// HELPER PUT //
export const updatePasswordUser = async function (email: string) {

  let user = await User.findOne({ where: { email: email } });
  
  let response = "";
  if(user) {
    const newPassword = generateRandomPassword(16);
    const updateUser = await User.update(
      {
        password: newPassword,
      },
      {
        where: { id: user.dataValues.id },
      }
    )
    
    // ENVIAR EMAIL A USUARIO
    const emailTemplate = resetPasswordTemplate(user.dataValues.name, newPassword);
    let sendmail = await MailService(
        user.dataValues.email, 
        "Restablecer Contraseña - PropTech", 
        emailTemplate.html
      );

    response = "Estimado usuario, se envió una contraseña temporal al email proporcionado. Revise su bandeja de entrada.";
  } else {
    response = "El Email proporcionado no está registrado en nuestro sistema";
  }

  return response;
};

// FUNCIÓN PARA GENERAR UNA CONTRASEÑA ALEATORIA
function generateRandomPassword(length: number): string {
  const buffer = randomBytes(length);
  const password = buffer.toString('base64');
  return password.slice(0, length);
}


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

  //ENVIAR EMAIL A USUARIO
  const emailTemplate = rol === "Cliente" ? clientUserTemplate(name) : supplierUserTemplate(name);
  let sendmail = await MailService(email, "Bienvenido - PropTech", emailTemplate.html
  );

  return creatingUser;
}
