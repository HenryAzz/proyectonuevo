import { Request, Response, Router } from "express";
import mercadopago from "mercadopago";
import type {
  CreatePreferencePayload,
  PreferencePayer,
  PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";
import config from "../../../lib/config";
import {sequelize} from '../../db'
const { Form } = sequelize.models;


require("dotenv").config();

export const createOrder = async (req: Request, res: Response) => {

  const formulario = await Form.findAll()
  console.log(formulario)

  mercadopago.configure({ access_token: config.accessToken });

  const preference: CreatePreferencePayload = {
    binary_mode: true,
    items: [
      {
        //aca faltaria el tema del llamado del get de las prop pero falta el del id,
        //una ves que se lo tengas lo tenes q llenar con la variable que le desiganas(prop)
        //y poner prop.title
        id: "1",
        title: "Operaciones",
        description: "Gastos Administrativos para operaciones",
        picture_url: "https://utan.edu.mx/blog/wp-content/uploads/2016/06/administracion.jpg",
        quantity: 1 as number,
        currency_id: "ARS",
        unit_price: 10 as number,
      },
    ],
    back_urls: {
      success: "http://127.0.0.1:5173/home",
      failure: "http://127.0.0.1:5173/",
      pending: "",
    } as PreferenceBackUrl,
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response)
      res.status(200).json({global: response.body.id});
    })
    .catch((error) => {
      res.status(500).json({global: error.message});
    });
};
