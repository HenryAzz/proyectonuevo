import s from "./Review.module.css";
import icon from "../../image/5066618.png";
import icon2 from "../../image/5066622.png";
import * as Yup from "yup";
import { Box, Button, Paper, TextField, Grid } from "@mui/material";
import logo from "../../image/logo.png";
import { StarRating } from "./StarRating";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";

export const Review = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const onSubmit = (values: any, props: any) => {
    console.log(values);
    console.log(props);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };
  const initialValues = {
    name: "",
    email: "",
    motive: "",
    message: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Es demasiado corto").required("Requerido"),
    motive: Yup.string().min(3, "Es demasiado corto").required("Requerido"),
    email: Yup.string()
      .required("Requerido")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Ingrese un correo electronico valido"),
    message: Yup.string()
      .min(100, "Cantidad minima de caracteres 100")
      .required("Requerido")
      .matches(/^.{100,}$/),

    termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions"),
  });

  return (
    <Box>
      <img src={logo} alt="logo" width="250px" height="50px" />
      <br />
      <br />

      <Box
        sx={{
          display: "grid",
          border: "2px solid #ef953b",
          borderRadius: "20px",
          background: "#ffe0b2a6",

          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "38px" }}>Testimonios de nuestros Clientes</h1>
      </Box>
      <br />
      <Box
        sx={{
          display: "grid",
          border: "3px solid #ef953b",
          borderRadius: "20px",
          background: "#ffe0b2a6",
          gridTemplateRows: "auto",
          alignContent: "center",
          justifyContent: "center",
          padding: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(370px, 1fr))",
        }}
      >
        <Box sx={{ my: 3, mx: 2 }} className={s.card}>
          <div className={s.layer}></div>
          <div className={s.content}>
            <div>
              <StarRating />
            </div>
            <p>
              Estoy muy conforme con la forma de atención de Samuel Bocanegra, es un chico que supo
              comunicarme tranquilad al momento de mis inquietudes, como también al momento de la
              seña de la casa. Recomendable al 100% esta empresa como a los vendedores.
            </p>
            <div className={s.image}>
              <img src={icon} alt="avatar" />
            </div>
            <div className={s.details}>
              <h2>Sofía Francavilla</h2>
            </div>
          </div>
        </Box>
        <Box sx={{ my: 3, mx: 2 }} className={s.card}>
          <div className={s.layer}></div>
          <div className={s.content}>
            <div>
              <StarRating />
            </div>
            <p>
              Estoy muy conforme con la forma de atención de Samuel Bocanegra, es un chico que supo
              comunicarme tranquilad al momento de mis inquietudes, como también al momento de la
              seña de la casa. Recomendable al 100% esta empresa como a los vendedores.
            </p>
            <div className={s.image}>
              <img src={icon} alt="avatar" />
            </div>
            <div className={s.details}>
              <h2>Sofía Francavilla</h2>
            </div>
          </div>
        </Box>
        <Box sx={{ my: 3, mx: 2 }} className={s.card}>
          <div className={s.layer}></div>
          <div className={s.content}>
            <div>
              <StarRating />
            </div>
            <p>
              Estoy muy conforme con la forma de atención de Samuel Bocanegra, es un chico que supo
              comunicarme tranquilad al momento de mis inquietudes, como también al momento de la
              seña de la casa. Recomendable al 100% esta empresa como a los vendedores.
            </p>
            <div className={s.image}>
              <img src={icon} alt="avatar" />
            </div>
            <div className={s.details}>
              <h2>Sofía Francavilla</h2>
            </div>
          </div>
        </Box>
        <Box sx={{ my: 3, mx: 2 }} className={s.card}>
          <div className={s.layer}></div>
          <div className={s.content}>
            <div>
              <StarRating />
            </div>
            <p>
              Estoy muy conforme con la forma de atención de Samuel Bocanegra, es un chico que supo
              comunicarme tranquilad al momento de mis inquietudes, como también al momento de la
              seña de la casa. Recomendable al 100% esta empresa como a los vendedores.
            </p>
            <div className={s.image}>
              <img src={icon} alt="avatar" />
            </div>
            <div className={s.details}>
              <h2>Sofía Francavilla</h2>
            </div>
          </div>
        </Box>
        <Box sx={{ my: 3, mx: 2 }} className={s.card}>
          <div className={s.layer}></div>
          <div className={s.content}>
            <div>
              <StarRating />
            </div>
            <p>
              Estoy muy conforme con la forma de atención de Samuel Bocanegra, es un chico que supo
              comunicarme tranquilad al momento de mis inquietudes, como también al momento de la
              seña de la casa. Recomendable al 100% esta empresa como a los vendedores.
            </p>
            <div className={s.image}>
              <img src={icon} alt="avatar" />
            </div>
            <div className={s.details}>
              <h2>Sofía Francavilla</h2>
            </div>
          </div>
        </Box>
        <Box sx={{ my: 3, mx: 2 }} className={s.card}>
          <div className={s.layer}></div>
          <div className={s.content}>
            <div>
              <StarRating />
            </div>
            <p>
              Estoy muy conforme con la forma de atención de Samuel Bocanegra, es un chico que supo
              comunicarme tranquilad al momento de mis inquietudes, como también al momento de la
              seña de la casa. Recomendable al 100% esta empresa como a los vendedores.
            </p>
            <div className={s.image}>
              <img src={icon} alt="avatar" />
            </div>
            <div className={s.details}>
              <h2>Sofía Francavilla</h2>
            </div>
          </div>
        </Box>
        <Box sx={{ my: 3, mx: 2 }} className={s.card}>
          <div className={s.layer}></div>
          <div className={s.content}>
            <div>
              <StarRating />
            </div>
            <p>me gusto como me atendio pepito</p>
            <div className={s.image}>
              <img src={icon2} alt="avatar" />
            </div>
            <div className={s.details}>
              <h2>Santiago baraja </h2>
            </div>
          </div>
        </Box>
      </Box>
      <br />
      <Box
        sx={{
          display: "grid",
          border: "2px solid #ef953b",
          borderRadius: "20px",
          background: "#ffe0b2a6",

          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <h2>Contactanos</h2>
      </Box>
      <br />
      <Box
        sx={{
          display: "grid",
          border: "3px solid #ef953b",
          borderRadius: "20px",
          background: "#ffe0b2a6",

          padding: "10px",
          gridTemplateColumns: "repeat(auto-fit, minmax(370px, 1fr))",
        }}
      >
        <Paper sx={{ background: "rgba(181, 179, 179, 0.384)" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            sx={{ color: "black" }}
          >
            <Form>
              <Box sx={{ display: "flex", gap: 2, my: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="name"
                  label="Nombre"
                  placeholder="Nombre"
                  inputProps={{ style: { color: "black" } }}
                  InputLabelProps={{ style: { color: "black" } }}
                  helperText={
                    <strong>
                      <ErrorMessage name="name" />
                    </strong>
                  }
                />
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Correo Electronico"
                  placeholder="Correo Electronico"
                  inputProps={{ style: { color: "black" } }}
                  InputLabelProps={{ style: { color: "black" } }}
                  helperText={
                    <strong>
                      <ErrorMessage name="email" />
                    </strong>
                  }
                />
              </Box>
              <Field
                as={TextField}
                fullWidth
                name="motive"
                label="Asunto"
                placeholder="Asundo de la consulta"
                inputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                helperText={
                  <strong>
                    <ErrorMessage name="motive" />
                  </strong>
                }
              />
              <Box>
                <Field
                  as={TextField}
                  fullWidth
                  multiline
                  masRows={4}
                  value={value}
                  onChange={handleChange}
                  name="message"
                  label="Detallanos tu consulta"
                  placeholder="Detallanos tu consulta"
                  inputProps={{ style: { color: "black" } }}
                  InputLabelProps={{ style: { color: "black" } }}
                  helperText={
                    <strong>
                      <ErrorMessage name="message" />
                    </strong>
                  }
                />
              </Box>
              <Box>
                <Button variant="contained">Enviar Consulta</Button>
              </Box>
            </Form>
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
};
