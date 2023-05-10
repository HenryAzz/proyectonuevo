
const createSignal = function (user: string, property) {
  const html = `
      <!DOCTYPE html>
      <html lang="en">
         <head>
            <title></title>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
            <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
            <style>
               * {
               box-sizing: border-box;
               }
               body {
               margin: 0;
               padding: 0;
               }
               a[x-apple-data-detectors] {
               color: inherit !important;
               text-decoration: inherit !important;
               }
               #MessageViewBody a {
               color: inherit;
               text-decoration: none;
               }
               p {
               line-height: inherit
               }
               .desktop_hide,
               .desktop_hide table {
               display: none;
               max-height: 0px;
               overflow: hidden;
               }
               .image_block img+div {
               display: none;
               }
               @media (max-width:660px) {
               .desktop_hide table.icons-inner,
               .social_block.desktop_hide .social-table {
               display: inline-block !important;
               }
               .icons-inner {
               text-align: center;
               }
               .icons-inner td {
               margin: 0 auto;
               }
               .image_block img.big,
               .row-content {
               width: 100% !important;
               }
               .menu-checkbox[type=checkbox]~.menu-links {
               display: none !important;
               padding: 5px 0;
               }
               .menu-checkbox[type=checkbox]:checked~.menu-trigger .menu-open,
               .menu-checkbox[type=checkbox]~.menu-links span.sep {
               display: none !important;
               }
               .menu-checkbox[type=checkbox]:checked~.menu-links,
               .menu-checkbox[type=checkbox]~.menu-trigger {
               display: block !important;
               max-width: none !important;
               max-height: none !important;
               font-size: inherit !important;
               }
               .menu-checkbox[type=checkbox]~.menu-links>a,
               .menu-checkbox[type=checkbox]~.menu-links>span.label {
               display: block !important;
               text-align: center;
               }
               .menu-checkbox[type=checkbox]:checked~.menu-trigger .menu-close {
               display: block !important;
               }
               .mobile_hide {
               display: none;
               }
               .stack .column {
               width: 100%;
               display: block;
               }
               .mobile_hide {
               min-height: 0;
               max-height: 0;
               max-width: 0;
               overflow: hidden;
               font-size: 0px;
               }
               .desktop_hide,
               .desktop_hide table {
               display: table !important;
               max-height: none !important;
               }
               }
               #memu-r0c0m1:checked~.menu-links {
               background-color: transparent !important;
               }
               #memu-r0c0m1:checked~.menu-links a,
               #memu-r0c0m1:checked~.menu-links span {
               color: #001e3e !important;
               }
            </style>
         </head>
         <body style="background-color: #fffaf2; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="background-color: #ffffff; color: #000000; width: 640px;" width="640">
               <tbody>
                  <tr>
                     <td class="column column-1" style="font-weight: 400; text-align: left; padding-bottom: 30px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" width="100%">
                           <tr>
                              <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                 <div align="center" class="alignment" style="line-height:10px"><a href="#" style="outline:none" tabindex="-1" target="_blank">
                                    <img alt="your-logo" src="https://res.cloudinary.com/dmwmdylpa/image/upload/v1683407215/logo_kwplct.png" style="display: block; height: auto; border: 0; width: 126px; max-width: 100%;" title="your-logo" width="126"/></a>
                                 </div>
                              </td>
                           </tr>
                        </table>
                        <table border="0" cellpadding="0" cellspacing="0" class="menu_block block-2" role="presentation" width="100%">
                           <tr>
                              <td class="pad" style="color:#3f475e;font-family:inherit;font-size:13px;letter-spacing:2px;padding-bottom:10px;padding-top:10px;text-align:center;">
                                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tr>
                                       <td class="alignment" style="text-align:center;font-size:0px;">
                                             <input class="menu-checkbox" id="memu-r0c0m1" style="display:none !important;max-height:0;visibility:hidden;" type="checkbox"/>
                                             <div class="menu-trigger" style="display:none;max-height:0px;max-width:0px;font-size:0px;overflow:hidden;">
                                                <label class="menu-label" for="memu-r0c0m1" style="height: 36px; width: 36px; display: inline-block; cursor: pointer;  user-select: none; text-align: center; color: #001e3e; text-decoration: none; background-color: transparent; border-radius: 0;"><span class="menu-open" style="font-size:26px;line-height:31.5px;">☰</span><span class="menu-close" style="display:none;font-size:26px;line-height:36px;">✕</span>
                                                </label>
                                             </div>
                                          <div class="menu-links">
                                             <a href="#" style="padding-top:5px;padding-bottom:5px;padding-left:15px;padding-right:15px;display:inline-block;color:#3f475e;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:13px;text-decoration:none;letter-spacing:2px;" target="_self">Local</a>

                                             <a href="#" style="padding-top:5px;padding-bottom:5px;padding-left:15px;padding-right:15px;display:inline-block;color:#3f475e;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:13px;text-decoration:none;letter-spacing:2px;" target="_self">Vivienda</a>

                                             <a href="#" style="padding-top:5px;padding-bottom:5px;padding-left:15px;padding-right:15px;display:inline-block;color:#3f475e;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:13px;text-decoration:none;letter-spacing:2px;" target="_self">Oficina</a>

                                             <a href="#" style="padding-top:5px;padding-bottom:5px;padding-left:15px;padding-right:15px;display:inline-block;color:#3f475e;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:13px;text-decoration:none;letter-spacing:2px;" target="_self">Industria</a>
                                          </div>
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </tbody>
            </table>
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="background-color: #f9ecdc; color: #000000; background-position: center top; width: 640px;" width="640">
               <tbody>
                  <tr>
                     <td class="column column-1" style="font-weight: 400; text-align: left; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                        <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="word-break: break-word;" width="100%">
                           <tr>
                              <td class="pad" style="padding-top:15px;">
                              <div style="font-family: sans-serif">
                                    <div class="" style="font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 12px; color: #2b2d49; line-height: 1.5;">
                                       <p style="margin: 0; font-size: 11px; text-align: center; "><span style="font-size:15px;caret-color:#152a6d;"><strong>HAS TUS SUEÑOS UNA REALIZAD</strong></span></p>
                                       <p style="margin: 0; font-size: 14px; text-align: center;"><span style="color:#152a6d;"><span style="caret-color:#152a6d;font-size:15px;"><span style="color:#a31731;">CON PROPTECH </span></p>
                                    </div>
                              </div>
                              </td>
                           </tr>
                           <tr>
                              <td class="pad" style="padding-top:15px;">
                                 <div style="font-family: sans-serif">
                                       <div class="" style="font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 12px; color: #2b2d49; line-height: 1.5;">
                                          <p style="margin: 0; font-size: 14px; text-align: center; letter-spacing: 2px;"><span style="font-size:30px;caret-color:#152a6d;"><strong>REGISTRO DE SOLICITUD</strong></span></p>     
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </tbody>
            </table>

            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="background-color: #f9ecdc; color: #000000; width: 640px;" width="640">
               <tbody>
                  <tr>
                     <td class="column column-1" style="font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                        <div class="spacer_block block-2" style="height:20px;line-height:20px;font-size:1px;"> </div>
                        <table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="word-break: break-word;" width="100%">
                           <tr>
                              <td class="pad" style="padding-left:30px;padding-right:30px;">
                                 <div style="font-family: sans-serif">
                                    <div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #2b2d49; line-height: 1.2;">
                                          <p style="margin: 0; text-align: justify; font-size: 15px;">Hola <b>${user},</b></p><br>

                                          <p style="margin: 0; text-align: justify; font-size: 15px; padding-top: 10px">Gracias por su interés en nuestra inmobiliaria <b>PropTech</b>. Hemos recibido su solicitud para comprar o alquilar una propiedad y nos complace que haya considerado trabajar con nosotros.<p>
                                          <p style="margin: 0; text-align: justify; font-size: 15px; padding-top: 10px">A continuación, se detalla la información proporcionada:<p>

                                          <ul>
                                             <li><b>TIPO VIVIENDA: ${property.dataValues.type}</b></li>
                                             <li><b>N° DORMITORIOS: ${property.dataValues.bedroom}</b></li>
                                             <li><b>DIRECCIÓN: ${property.dataValues.address}</b></li>
                                             <li><b>ESPACIOS: ${property.dataValues.spaces}</b></li>
                                             <li><b>PRECIO: ${property.dataValues.price}</b></li>
                                             <li><b>PISOS: ${property.dataValues.floors}</b></li>
                                             <li><b>ÁREA TOTAL: ${property.dataValues.total_area}</b></li>
                                             <li><b>ÁREA CONSTRUIDA: ${property.dataValues.covered_area}</b></li>
                                             <li><b>N° BAÑOS: ${property.dataValues.bathroom}</b> </li>
                                             <li><b>AMUEBLADA: ${property.dataValues.furnished === true ? "SI" : "NO"}</b></li>
                                             <li><b>ANTIGUEDAD: ${property.dataValues.antiquity}</b></li>
                                             <li><b>DESCRIPCIÓN: ${property.dataValues.description}</b></li>
                                          </ul>

                                          <p style="margin: 0; text-align: justify; font-size: 15px; padding-top: 10px">Con la información proporcionada, uno de nuestros agentes de bienes raíces se pondrá en contacto con usted para discutir los siguientes pasos y programar una visita a las propiedades que se ajusten a sus necesidades y presupuesto.<p>

                                          <p style="margin: 0; text-align: justify; font-size: 15px; padding-top: 10px">Tenga en cuenta que nuestro objetivo es proporcionarle un servicio personalizado y profesional en cada paso del camino. Trabajaremos arduamente para garantizar que su experiencia de compra o alquiler sea lo más exitosa posible.<p>

                                          <p style="margin: 0; text-align: justify; font-size: 15px; padding-top: 10px">Gracias de nuevo por su interés en <b>PropTech</b>. Esperamos trabajar con usted pronto.<p>

                                          <p style="margin: 0; text-align: justify; font-size: 15px; padding-top: 10px">Atentamente,<p>

                                          <p style="margin: 0; text-align: center; font-size: 15px; padding-top: 10px"><b>PropTech</b><p> <br><br>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </tbody>
            </table>

            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="background-color: #ffffff; color: #000000; width: 640px;" width="640">
               <tbody>
                  <tr>
                     <td class="column column-1" style="font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                        <div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;"> </div>
                        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" width="100%">
                           <tr>
                              <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                 <div align="center" class="alignment" style="line-height:10px; font-family: 'Montserrat',Arial,sans-serif; height: 14px;">
                                    <p style="font-size:13px;">
                                       ¿Necesita apoyo adicional?
                                    </p>
                                    <p style="font-size:13px;">
                                       Póngase en contacto con nosotros en
                                       <a href="mailto:PF.porp.tech@gmail.com" class="hover-underline" style="--text-opacity: 1; color: #7367f0;  text-decoration: none;">PF.porp.tech@gmail.com</a>.
                                    </p>
                                 </div>
                                 <br><br><br>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </tbody>
            </table>

            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="background-color: #ffffff; color: #000000; width: 640px;" width="640">
               <tbody>
                  <tr>
                     <td class="column column-1" style="font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                        <table border="0" cellpadding="10" cellspacing="0" class="text_block block-1" role="presentation" style="word-break: break-word;" width="100%">
                           <tr>
                              <td class="pad">
                                 <div style="font-family: sans-serif">
                                    <div class="" style="font-size: 14px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #4a4a4a; line-height: 1.2;">
                                       <p style="margin: 0; text-align: center;">Your Street 12, Buenos Aires - Agentina</p>
                                       <p style="margin: 0; text-align: center;">PF.porp.tech@gmail.com</p>
                                       <p style="margin: 0; text-align: center;">(+1) 123 456 789</p>
                                       <p style="margin: 0; text-align: center;"><b>PropTech</b></p>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </tbody>
            </table>

            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="background-color: #ffffff; color: #000000; width: 640px;" width="640">
               <tbody>
                  <tr>
                     <td class="column column-1" style="font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                        <table border="0" cellpadding="0" cellspacing="0" class="menu_block block-1" role="presentation" width="100%">
                           <tr>
                              <td class="pad" style="color:#4a4a4a;font-family:inherit;font-size:14px;text-align:center;">
                                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tr>
                                       <td class="alignment" style="text-align:center;font-size:0px;">
                                          <div class="menu-links">
                                             <a href="#" style="padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;display:inline-block;color:#4a4a4a;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:14px;text-decoration:none;letter-spacing:normal;" target="_self">Equipo de Soporte PropTech</a></div>
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
                        </table>
                        <div class="spacer_block block-2" style="height:40px;line-height:40px;font-size:1px;"> </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </body>
         </html> 
  `;

  const text = ``;

  return {
    html: html,
    text: text,
  };
};

export default createSignal;
  