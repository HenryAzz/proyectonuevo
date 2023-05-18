import { Request, Response, Router } from "express";
import mercadopago from "mercadopago";
import type {
  CreatePreferencePayload,
  PreferencePayer,
  PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";
import config from "../../../lib/config";
import {sequelize} from '../../db';
const { Form } = sequelize.models;


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
        id: form.dni,
        title: form.title,
        description: form.description,
        picture_url: "https://utan.edu.mx/blog/wp-content/uploads/2016/06/administracion.jpg",
        quantity: 1 as number,
        currency_id: "ARS",
        unit_price: form.unit_price as number,
      },
    ],
    payer: {
      email: form.email as string,
    } as PreferencePayer,
    back_urls: {
			"success": "http://127.0.0.1:5173/home",
			"failure": "http://127.0.0.1:5173/home",
			"pending": ""
    } as PreferenceBackUrl,
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then( async function (response) {
    
      await Form.update(
        { 
          preferenceIdMP :  response.body.id 
        },
        {
          where: { dni: findForm.dataValues.dni}
        })
      
      res.status(200).json({global: response.body.id});
    })
    .catch((error) => {
      res.status(500).json({global: error.message});
    });
};

export const getPayment = async (req: Request, res: Response) => {

console.log(req.body)
  await Form.update(
    { 
      payed: req.body.status
    },
    {
      where: {preferenceIdMP :  req.body.preference_id}
    })

  // res.json({
	// 	Payment: req.query.payment_id,
	// 	Status: req.query.status,
	// 	MerchantOrder: req.query.merchant_order_id
	// });
} 
// import { Request, Response } from "express";
// import mercadopago from "mercadopago";
// import type {
//   CreatePreferencePayload,
//   PreferencePayer,
//   PreferenceBackUrl,
// } from "mercadopago/models/preferences/create-payload.model";
// import config from "../../../lib/config";
// import { sequelize } from "../../db";
// const { Broker } = sequelize.models;

// export const createOrder = async (req: Request, res: Response) => {
//   const form = req.body;
//   const broker = await Broker.findOne({ where: { division: form.type_prop } });

//   mercadopago.configure({ access_token: config.accessToken });

//   const preference: CreatePreferencePayload = {
//     binary_mode: true,
//     items: [
//       {
//         id: form.dni,
//         title: form.title,
//         description: form.description,
//         picture_url: "https://utan.edu.mx/blog/wp-content/uploads/2016/06/administracion.jpg",
//         quantity: 1 as number,
//         currency_id: "ARS",
//         unit_price: form.unit_price as number,
//       },
//     ],
//     payer: {
//       email: form.email as string,
//     } as PreferencePayer,
//     back_urls: {
//       success: "http://127.0.0.1:5173/home",
//       failure: "http://127.0.0.1:5173/",
//       pending: "",
//     } as PreferenceBackUrl,
//     auto_return: "approved",
//   };

//   try {
//     const response = await mercadopago.preferences.create(preference);
//     const preferenceId: string = response.body.id;
//     console.log("ID de la preferencia:", preferenceId);

//     // Obtener comprobante de pago
//     const searchResponse = await mercadopago.payment.search({
//       qs: {
//         preference_id: preferenceId,
//       },
//     });

//     console.log("Comprobante de pago:", searchResponse.body);

//     res.status(200).json({ global: preferenceId });
//   } catch (error) {
//     console.error("Error al crear la preferencia:", error);
//     res.status(500).json({ global: error });
//   }
// };
