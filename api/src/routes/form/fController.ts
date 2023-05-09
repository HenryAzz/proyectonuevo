//Funciones que manejan la request y los errores. Llaman a la fcn que se encarga de traer la Info

import { Response, Request } from "express";
import { gForm, createForm, dForm, idForm, pForm } from "./fHelper";
import Form from "../../models/Form";

//GET (filtros combinados)
export const getForm = async (req: Request, res: Response) => {
  const {
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
    postalCode,
  } = req.query;

  try {
    if (req.query.id) {
      const form = await gForm(
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
      );
      console.log("no paso");
      return res.status(200).json(form);
    }

    const formTotal = await Form.findAll();
    console.log("paso");
    res.status(200).json(formTotal);
  } catch (error: any) {
    return res.status(404).send({ error: error.message });
  }
};

//POST
export const postForm = async (req: Request, res: Response) => {
  try {
    const newForm = await createForm(req.body);
    return res.status(200).json(newForm);
  } catch (error: any) {
    return res.status(404).send({ error: error.message });
  }
};

// GET ID
export const getFormId = async (req: Request, res: Response) => {
  let { id } = req.params;
  const idNum: number = Number(id);
  try {
    const form = await idForm(idNum);
    return res.status(200).json(form);
  } catch (error: any) {
    return res.status(404).send({ error: error.message });
  }
};

//DELETE ID
export const deleteForm = async (req: Request, res: Response) => {
  let { id } = req.params;
  const idNum: number = Number(id);
  try {
    const delet = await dForm(idNum);
    res.status(200).json(delet);
  } catch (error: any) {
    return res.status(404).send({ error: error.message });
  }
};

//  PUT PROPERTY
export const putForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const put = req.body;

    const updateForm = await pForm(id, put);

    res.status(200).send({ msj: "Form actualizado correctamente." });
  } catch (error: any) {
    res.status(404).send(error.error);
  }
};
