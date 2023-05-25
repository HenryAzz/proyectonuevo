import { Response, Request } from "express";
import { sequelize } from "../../db";
import { MailService } from "../../services/mailerService";
import messageUserTemplate from "../../templates/messageUserTemplate";

const { User, Broker } = sequelize.models;

export const postMessage = async (req: Request, res: Response) => {
  try {
    const { brokeremail, useremail, message } = req.body;

    let user = await User.findOne({ where: { email: useremail } });
    let broker = await Broker.findOne({ where: { email: brokeremail } });
    
    //ENVIAR EMAIL A USUARIO
    const emailTemplate = messageUserTemplate(user.dataValues.name, message, broker);

    let sendmail = await MailService(user.dataValues.email, "Comunicado - PropTech", emailTemplate.html);

    res.send({ msj: "Mensaje Enviado correctamente" });
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};