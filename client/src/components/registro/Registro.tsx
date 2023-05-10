import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Container,
  Box,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { orange } from "@mui/material/colors";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import mano from "../../image/mano.png";
import { Link } from "react-router-dom";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Registro = () => {
  const paperStyle = { padding: 20, width: 350, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const colorf = orange[50];
  const Img = styled("img")({
    width: 50,
    height: 50,
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Es demasiado corto").required("*Campo Obligatorio"),
    email: Yup.string()
      .required("*Campo Obligatorio")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Ingrese correo electronico valido"),

    phoneNumber: Yup.number().typeError("Ingrese número valido").required("*Campo Obligatorio"),
    password: Yup.string()
      .min(8, "La longitud mínima de la contraseña debe ser 8")
      .required("*Campo Obligatorio")
      .matches(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
        "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Contraseña no coincidente")
      .required("*Campo Obligatorio"),
    termsAndConditions: Yup.string().oneOf(["true"], "Aceptar términos y condiciones"),
  });
  const onSubmit = (values: any, props: any) => {
    console.log(values);
    console.log(props);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };
  return (
    <Container sx={{ width: "auto" }}>
      <br />
      <Container
        sx={{
          borderRadius: 10,
          bgcolor: colorf,

          width: "500px",
          height: "auto",
        }}
      >
        <Link to="/home">
          <Img src={mano} alt="logo" />
        </Link>
        <Box>
          <Paper style={paperStyle}>
            <Grid>
              <h1 style={headerStyle}>Registro</h1>
              <Typography variant="caption" gutterBottom>
                Por favor complete este formulario para crear una cuenta !
              </Typography>
            </Grid>
            <br />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(props) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Nombre Completo"
                    placeholder="Ingrese su nombre completo"
                    helperText={
                      <strong>
                        <ErrorMessage name="name" />
                      </strong>
                    }
                  />
                  <br />
                  <br />
                  <Field
                    as={TextField}
                    fullWidth
                    name="email"
                    label="Correo Electronico"
                    placeholder="Ingrese su correo electronico"
                    helperText={
                      <strong>
                        <ErrorMessage name="email" />
                      </strong>
                    }
                  />
                  <br />
                  <br />
                  <Field
                    as={TextField}
                    fullWidth
                    name="phoneNumber"
                    label="Número Telefonico"
                    placeholder="Ingrese su número telefonico"
                    helperText={
                      <strong>
                        <ErrorMessage name="phoneNumber" />
                      </strong>
                    }
                  />
                  <br />
                  <br />
                  <Field
                    as={TextField}
                    fullWidth
                    name="password"
                    type="password"
                    label="Contraseña"
                    placeholder="Ingrerse su contraseña"
                    helperText={
                      <strong>
                        <ErrorMessage name="password" />
                      </strong>
                    }
                  />
                  <br />
                  <br />
                  <Field
                    as={TextField}
                    fullWidth
                    name="confirmPassword"
                    type="password"
                    label="Confirme su contraseña"
                    placeholder="Confirme su contraseña"
                    helperText={
                      <strong>
                        <ErrorMessage name="confirmPassword" />
                      </strong>
                    }
                  />
                  <br />
                  <br />
                  <FormControlLabel
                    control={<Field as={Checkbox} name="termsAndConditions" />}
                    label=""
                  />
                  <Button onClick={handleOpen} sx={{ ml: "-20px" }}>
                    {" "}
                    acepto terminos y condiciones
                  </Button>
                  <br />
                  <FormHelperText>
                    <strong>
                      <ErrorMessage name="termsAndConditions" />
                    </strong>
                  </FormHelperText>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={props.isSubmitting}
                    color="primary"
                  >
                    {props.isSubmitting ? "Loading" : "Registrarme"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  {/* <Typography id="transition-modal-title" variant="h4" component="h2">
            TERMINOS Y CONDICIONES DE USO
            </Typography> */}
                  <Typography
                    id="transition-modal-description"
                    sx={{ mt: 2 }}
                    height={700}
                    overflow="auto"
                  >
                    <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 2 }}>
                      TERMINOS Y CONDICIONES DE USO
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
                      INFORMACIÓN RELEVANTE
                    </Typography>
                    Es requisito necesario para la adquisición de los productos que se ofrecen en
                    este sitio, que lea y acepte los siguientes Términos y Condiciones que a
                    continuación se redactan. El uso de nuestros servicios así como la compra de
                    nuestros productos implicará que usted ha leído y aceptado los Términos y
                    Condiciones de Uso en el presente documento. Todas los productos que son
                    ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas o
                    presentadas por una página web tercera y en tal caso estarían sujetas a sus
                    propios Términos y Condiciones. En algunos casos, para adquirir un producto,
                    será necesario el registro por parte del usuario, con ingreso de datos
                    personales fidedignos y definición de una contraseña. El usuario puede elegir y
                    cambiar la clave para su acceso de administración de la cuenta en cualquier
                    momento, en caso de que se haya registrado y que sea necesario para la compra de
                    alguno de nuestros productos. www.propTech.com.ar no asume la responsabilidad en
                    caso de que entregue dicha clave a terceros. Todas las compras y transacciones
                    que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de
                    confirmación y verificación, el cual podría incluir la verificación del stock y
                    disponibilidad de producto, validación de la forma de pago, validación de la
                    factura (en caso de existir) y el cumplimiento de las condiciones requeridas por
                    el medio de pago seleccionado. En algunos casos puede que se requiera una
                    verificación por medio de correo electrónico. Los precios de los productos
                    ofrecidos en esta Tienda Online es válido solamente en las compras realizadas en
                    este sitio web. LICENCIA propTech a través de su sitio web concede una licencia
                    para que los usuarios utilicen los productos que son vendidos en este sitio web
                    de acuerdo a los Términos y Condiciones que se describen en este documento. USO
                    NO AUTORIZADO En caso de que aplique (para venta de software, templetes, u otro
                    producto de diseño y programación) usted no puede colocar uno de nuestros
                    productos, modificado o sin modificar, en un CD, sitio web o ningún otro medio y
                    ofrecerlos para la redistribución o la reventa de ningún tipo. PROPIEDAD Usted
                    no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros
                    productos, modificado o sin modificar. Todos los productos son propiedad de los
                    proveedores del contenido. En caso de que no se especifique lo contrario,
                    nuestros productos se proporcionan sin ningún tipo de garantía, expresa o
                    implícita. En ningún esta compañía será responsables de ningún daño incluyendo,
                    pero no limitado a, daños directos, indirectos, especiales, fortuitos o
                    consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de
                    utilizar nuestros productos.
                    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
                      POLÍTICA DE REEMBOLSO Y GARANTÍA
                    </Typography>
                    En el caso de productos que sean mercancías irrevocables no-tangibles, no
                    realizamos reembolsos después de que se envíe el producto, usted tiene la
                    responsabilidad de entender antes de comprarlo. Le pedimos que lea
                    cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla
                    cuando la descripción no se ajusta al producto. Hay algunos productos que
                    pudieran tener garantía y posibilidad de reembolso pero este será especificado
                    al comprar el producto. En tales casos la garantía solo cubrirá fallas de
                    fábrica y sólo se hará efectiva cuando el producto se haya usado correctamente.
                    La garantía no cubre averías o daños ocasionados por uso indebido. Los términos
                    de la garantía están asociados a fallas de fabricación y funcionamiento en
                    condiciones normales de los productos y sólo se harán efectivos estos términos
                    si el equipo ha sido usado correctamente. Esto incluye: – De acuerdo a las
                    especificaciones técnicas indicadas para cada producto. – En condiciones
                    ambientales acorde con las especificaciones indicadas por el fabricante. – En
                    uso específico para la función con que fue diseñado de fábrica. – En condiciones
                    de operación eléctricas acorde con las especificaciones y tolerancias indicadas.
                    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
                      COMPROBACIÓN ANTIFRAUDE
                    </Typography>
                    La compra del cliente puede ser aplazada para la comprobación antifraude.
                    También puede ser suspendida por más tiempo para una investigación más rigurosa,
                    para evitar transacciones fraudulentas. PRIVACIDAD Este www.propTech.com.ar
                    garantiza que la información personal que usted envía cuenta con la seguridad
                    necesaria. Los datos ingresados por usuario o en el caso de requerir una
                    validación de los pedidos no serán entregados a terceros, salvo que deba ser
                    revelada en cumplimiento a una orden judicial o requerimientos legales. La
                    suscripción a boletines de correos electrónicos publicitarios es voluntaria y
                    podría ser seleccionada al momento de crear su cuenta. propTech reserva los
                    derechos de cambiar o de modificar estos términos sin previo aviso.
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </div>
        </Box>
        <br />
        <br />
      </Container>
    </Container>
  );
};
//
