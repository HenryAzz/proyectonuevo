import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const MailService = async (toUser: string, subject: string, htmlTemplate: string) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Verifico conexión a servidor de correo
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Servidor de correo conectado");
    }
  });

  let sendmail = await transporter.sendMail({
    from: `"Inmobiliaria PropTech" <${process.env.SMTP_USERNAME}>`, // sender address,
    to: toUser,
    subject: subject,
    // text: 'Hello World'
    html: htmlTemplate,
  });

  return sendmail;
};
