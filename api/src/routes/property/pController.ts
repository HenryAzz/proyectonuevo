
import { Response, Request } from "express";
import { findProps } from "./pHelper";
import { sequelize } from "../../db";


//Traemos la tabla de nuestra DB.
const {Property} = sequelize.models

//  GET PROPERTY  //
export const getProp= async (req: Request, res: Response) => {
  //Tratamos errores por buenas practicas.   
  try {
   const propertys = await findProps() //helper trae todas las props.
    return res.status(200).json(propertys);
      
    } catch (error) {
      return res.status(404).send({"error":error}) //enviar tipo de error
    }
  }
///////////////////



// POST PROPERTY //

//(Request y Response representan el Tipo de objeto de Req y Res. No los llamamos por su nombre completo en ningun momento)
  export const postProp= async (req: Request, res: Response) => {
    try {
      const db = await Property.create(req.body);
      res.send({"msj": "Creado correctamente"});
    } catch (error) {
      res.status(404).send(error);  
    }
  }
 
  /////////////////////