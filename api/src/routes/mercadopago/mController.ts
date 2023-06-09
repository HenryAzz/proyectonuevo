import { Request, Response } from "express";
import mercadopago from "mercadopago";
import type {
  CreatePreferencePayload,
  PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";
import config from "../../../lib/config";
import {sequelize} from '../../db';
const { Form, Signal } = sequelize.models;


export const createOrder = async (req: Request, res: Response) => {

  const form = req.body
  
  const findForm = await Form.findOne({where: { dni : form.dni}})

  mercadopago.configure({ access_token: config.accessToken });

  const preference: CreatePreferencePayload = {
    binary_mode: true,
    items: [
      {
        //aca faltaria el tema del llamado del get de las prop pero falta el del id,
        //una ves que se lo tengas lo tenes q llenar con la variable que le desiganas(prop)
        //y poner prop.title
        id: form.dni ,
        title: form.title,
        description: form.description || "reservar",
        picture_url: "https://utan.edu.mx/blog/wp-content/uploads/2016/06/administracion.jpg",
        quantity: 1 as number,
        currency_id: "ARS",
        unit_price: form.unit_price as number,
      },
    ],
    back_urls: {
			"success": config.urlSuccess,
			"failure": config. urlFailure,
			"pending": ""
    } as PreferenceBackUrl,
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then( async function (response) {
    
      if(findForm) {
        await Form.update(
          { 
            preferenceIdMP :  response.body.id 
          },
          {
            where: { id: findForm.dataValues.id}
          })
      }
      res.status(200).json({global: response.body.id});
    })
    .catch((error) => {
      res.status(500).json({global: error.message});
    });
};

//crear orden mercado pago para signal
export const createOrderSignal = async (req: Request, res: Response) => {

  const form = req.body
  
  const findSignal = await Signal.findOne({where: { propertyId : form.propertyId}})

  mercadopago.configure({ access_token: config.accessToken });

  const preference: CreatePreferencePayload = {
    binary_mode: true,
    items: [
      {
        //aca faltaria el tema del llamado del get de las prop pero falta el del id,
        //una ves que se lo tengas lo tenes q llenar con la variable que le desiganas(prop)
        //y poner prop.title
        id: form.propertyId ,
        title: form.operation,
        description: "reservar",
        picture_url: "https://utan.edu.mx/blog/wp-content/uploads/2016/06/administracion.jpg",
        quantity: 1 as number,
        currency_id: "ARS",
        unit_price: form.price as number,
      },
    ],
    back_urls: {
			"success": config.urlSuccess,
			"failure": config. urlFailure,
			"pending": ""
    } as PreferenceBackUrl,
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then( async function (response) {
    
      if(findSignal) {
        await Signal.update(
          { 
            preferenceId :  response.body.id 
          },
          {
            where: { id: findSignal.dataValues.id}
          })
      }
      res.status(200).json({global: response.body.id});
    })
    .catch((error) => {
      res.status(500).json({global: error.message});
    });
};


//verificar pago y modificar tabla de form 
export const getPayment = async (req: Request, res: Response) => {

  await Form.update(
    { 
      payed: req.body.status
    },
    {
      where: {preferenceIdMP :  req.body.preference_id}
    })

    await Signal.update(
      { 
        payed: req.body.status
      },
      {
        where: {preferenceId :  req.body.preference_id}
      })
  
} 
