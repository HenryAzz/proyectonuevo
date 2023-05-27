import s from "./Review.module.css";
import * as Yup from "yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useCreateConsultMutation, useGetReviewQuery } from "../../reduxToolkit/apiSlice";
import Swal from "sweetalert2";
import { auth } from "../../firebase/firebase";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const Review = () => {
  const { data } = useGetReviewQuery();
  const [value, setValue] = useState("");
  const [user, setUser] = useState<string | null | undefined>(null);
  const [
    createConsult,
    // { data }
  ] = useCreateConsultMutation();

  function convertirAEstrellas(numero: number) {
    if (numero < 1 || numero > 5) {
      return "Número fuera de rango";
    }

    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= numero) {
        estrellas.push(<StarIcon sx={{ color: "yellow", fontSize: 35 }} key={i} />);
      } else {
        estrellas.push(<StarBorderIcon sx={{ fontSize: 35 }} key={i} />);
      }
    }

    return estrellas;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const testimonio = data?.map((testimonio: any) => {
    return testimonio;
  });
  console.log(testimonio);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const onSubmit = async (values: any, props: any) => {
    if (user) {
      try {
        if (user === values.email) {
          const response = await createConsult(values);
          Toast.fire({
            icon: "success",
            title: "Su consulta fue registrado correctamente",
          });
          setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
          }, 2000);
        } else {
          Toast.fire({
            icon: "error",
            title: "El email proporcionado no está registrado en nuestro sistema",
          });
        }
      } catch (errors: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al registrar consulta..!!",
          confirmButtonColor: "#3085d6",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe iniciar Sesión para realizar una consulta..!!",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const initialValues = {
    name: "",
    email: "",
    issue: "",
    description: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Es demasiado corto").required("Requerido"),
    issue: Yup.string().min(3, "Es demasiado corto").required("Requerido"),
    email: Yup.string()
      .required("Requerido")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Ingrese un correo electronico valido"),
    description: Yup.string()
      .min(10, "Cantidad minima de caracteres 100")
      // .required("Requerido"),
      .matches(/^.{10,}$/),

    termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions"),
  });

  return (
    <Box>
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
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
      >
        {testimonio?.map((element: any, index: any) => (
          <Box
            sx={{
              my: 3,
              mx: 2,

              display: "grid",
            }}
            className={s.card}
          >
            <div className={s.layer}></div>
            <div className={s.content}>
              <div key={index}>
                <Typography variant="h3" sx={{ fontSize: 30 }}>
                  Broker: {element.target}
                </Typography>

                <strong>
                  <h3> {convertirAEstrellas(element.grade)} </h3>
                </strong>
                <p>{element.message}</p>
              </div>

              {/* <div className={s.image}>
                    <img src={icon} alt="avatar" />
                  </div> */}
              {/* <div className={s.details}>
                  <h2>Sofía Francavilla</h2>
                </div> */}
            </div>
          </Box>
        ))}
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
              name="issue"
              label="Asunto"
              placeholder="Asunto de la consulta"
              inputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              sx={{ display: "flex", my: 2 }}
              helperText={
                <strong>
                  <ErrorMessage name="issue" />
                </strong>
              }
            />
            <Box>
              <Field
                as={TextField}
                fullWidth
                multiline
                masRows={4}
                // value={value}
                // onChange={handleChange}
                name="description"
                label="Detallanos tu consulta"
                placeholder="Detallanos tu consulta"
                inputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                helperText={
                  <strong>
                    <ErrorMessage name="description" />
                  </strong>
                }
              />
            </Box>
            <Box>
              <Button type="submit" variant="contained">
                Enviar Consulta
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
