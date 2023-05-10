import { Response, Request } from "express";
import { findProps, deleteP, fillDataBase, putProperty } from "./pHelper";
import { sequelize } from "../../db";

//Traemos la tabla de nuestra DB.
const { Property } = sequelize.models;

//  GET PROPERTIES  //
export const getProp = async (req: Request, res: Response) => {
  const { operation, zone, maxPrice, type, situation } = req.query;
  //Tratamos errores por buenas practicas.
  try {
    const properties = await findProps(operation, zone, maxPrice, type, situation); //helper trae todas las props.
    return res.status(200).json(properties);
  } catch (error: any) {
    return res.status(404).send({ error: error.message }); //enviar tipo de error
  }
};
///////////////////

// POST PROPERTY //

//(Request y Response representan el Tipo de objeto de Req y Res. No los llamamos por su nombre completo en ningun momento)
export const postProp = async (req: Request, res: Response) => {
  try {
    const db = await Property.create(req.body);
    res.send({ msj: "Creado correctamente", db });
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

/////////////////////Delete Prop

export const deleteProp = async (req: Request, res: Response) => {
  let { id } = req.params;
  const idNum: number = Number(id);
  try {
    const property = await deleteP(idNum);
    res.status(200).json(property);
  } catch (error: any) {
    return res.status(404).send({ error: error });
  }
};

//funcion que llena la BD con propiedades de prueba.
export const postPropBulk = async (req: Request, res: Response) => {
  try {
    const properties = await fillDataBase();
    console.log(properties);
    return res.status(200).send("Base de datos Cargada");
  } catch (error: any) {
    return res.status(404).send({ error: error.message });
  }
};

//  PUT PROPERTY
export const putProp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const put = req.body;

    const updateProp = await putProperty(id, put);

    res.status(200).send({ msj: "Propiedad actualizada correctamente." });
  } catch (error: any) {
    res.status(404).send(error.error);
  }
};

//Funcion que trae la propiedad por id
export const getPropById = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  const propertyFound = await Property.findOne({ where: { id: Number(id) } });
  console.log(propertyFound);

  return res.status(200).send(propertyFound);
};
