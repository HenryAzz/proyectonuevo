import { Response, Request } from "express";
import {
  findUser,
  findUserRol,
  findUserByRolPersonType,
  findUserPerson_type,
  getUserSoloByEmail,
} from "./uHelper";
import { sequelize } from "../../db";
import exp from "constants";

//Traemos la tabla de nuestra DB.
const { User } = sequelize.models;

//  GET USERS  //
export const getUser = async (req: Request, res: Response) => {
  //Tratamos errores por buenas practicas.
  try {
    const { rol, person_type } = req.query;
    //Si no hay rol, trae todos los usuarios.
    if (!rol && !person_type) {
      const users = await findUser(); //helper trae todas las props.
      return res.status(200).json(users);
    }

    //Si hay rol y hay person_type, trae todos los usuarios con ese rol y person_type.
    if (rol && person_type) {
      const userByRolPersonType = await findUserByRolPersonType(
        rol as string,
        person_type as string
      );
      return res.status(200).json(userByRolPersonType);
    }

    //Si hay rol y no hay person_type, trae todos los usuarios con ese rol.
    if (rol && !person_type) {
      const userRole = await findUserRol(rol as string);
      return res.status(200).json(userRole);
    }

    //Si no hay rol y hay person_type, trae todos los usuarios con ese person_type.
    if (!rol && person_type) {
      const userPerson_type = await findUserPerson_type(person_type as string);
      return res.status(200).json(userPerson_type);
    }
  } catch (error) {
    return res.status(404).send({ error: error }); //enviar tipo de error
  }
};

//  POST USER  //
export const postUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    //validamos si los campos son nulos.
    if (!user.rol || !user.email || !user.password || !user.person_type || !user.name) {
      throw new Error("Campos incompletos, completar correctamente datos.");
    } else {
      //si los campos son correctos, creamos el usuario.
      await User.create(req.body);
      res.send({ msj: "Usuario creado correctamente", user: req.body });
    }
  } catch (error) {
    res.status(404).send({ error: error });
  }
};
////////////////////////////////////////////////////

//GOOGLE!

export const googleAcces = async (req: Request, res: Response) => {
  const comparing = req.body;
  try {
    const response = await getUserSoloByEmail(comparing);
    console.log("esto es comparing ==>", response);
    if (!response) return res.status(400).send("Error: password wrong");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};
