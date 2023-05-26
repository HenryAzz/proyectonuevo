import nodemailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

// export const MailService = async (toUser: string, subject: string, htmlTemplate: string) => {
//   let transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: true,
//     auth: {
//       user: process.env.SMTP_USERNAME,
//       pass: process.env.SMTP_PASSWORD,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   // Verifico conexión a servidor de correo
//   transporter.verify(function (error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Servidor de correo conectado");
//     }
//   });

//   let sendmail = await transporter.sendMail({
//     from: `"Inmobiliaria PropTech" <${process.env.SMTP_USERNAME}>`, // sender address,
//     to: toUser,
//     subject: subject,
//     // text: 'Hello World'
//     html: htmlTemplate,
//   });

//   return sendmail;
// };

export const MailService = async (toUser: string, subject: string, htmlTemplate: string) => {
  let transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
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


// FUNCIÓN PARA ENVIAR ARCHIVOS EN EMAIL PDF COMO ANEXOS
export const MailServiceWithDocument = async (toUser: string, subject: string, htmlTemplate: string, documents) => {
  let transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    }
  });

  // Obtener el contenido de los archivos desde la nube
  const getFiles = async () => {
    const promesas = documents.map(async (url) => {
      const respuesta = await axios.get(url, { responseType: 'arraybuffer' });
      return {
        filename: getNameFile(url),
        content: respuesta.data
      };
    });

    return Promise.all(promesas);
  };

  // Función auxiliar para obtener el nombre del archivo desde la URL
  const getNameFile = (url: string): string => {
    const partesURL = url.split('/');
    return partesURL[partesURL.length - 1];
  };

  let sendmail = await transporter.sendMail({
    from: `"Inmobiliaria PropTech" <${process.env.SMTP_USERNAME}>`, // sender address,
    to: toUser,
    subject: subject,
    html: htmlTemplate,
    attachments: await getFiles(),
  });

  return sendmail;
};