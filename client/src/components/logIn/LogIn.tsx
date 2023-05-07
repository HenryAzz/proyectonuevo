import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//improt intreface
import { createUserRequest } from "../../reduxToolkit/authentication";

//import RTK Query
import { useCreateUserMutation } from "../../reduxToolkit/apiSlice";

//import firebase methods
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup } from "firebase/auth";

export const LogIn = (handleChange: any) => {
  const [crateUser] = useCreateUserMutation();
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 400,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const initialValues = {
    username: "",
    password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter valid email"),
    password: Yup.string().required("Password required"),
  });
  const onSubmit = (values: any, props: any) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user !== null) {
        const newUser: createUserRequest = {
          name: user.displayName || "",
          avatar: user.photoURL || "",
          email: user.email || "",
          hashGoogle: user.uid || "",
          person_type: "Persona Fisica",
          rol: "Cliente",
        };
        crateUser(newUser);
      }
    } catch (error: any) {
      console.log("Error signing in with Google:", error.message);
    }
  };

  return (
    <Grid
      container
      direction="column-reverse"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Paper style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Ingresar</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Usuario"
                name="username"
                placeholder="Ingrese un usuario"
                fullWidth
                required
                helperText={<ErrorMessage name="Usuario" />}
              />
              <Field
                as={TextField}
                label="Contraseña"
                name="password"
                placeholder="Ingrese su Contraseña"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="Contraseña" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Recordarme"
              />
              <Link to="/home">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  style={btnstyle}
                  fullWidth
                >
                  {props.isSubmitting ? "Loading" : "Ingresar"}
                </Button>
              </Link>
              <Button variant="outlined" onClick={handleGoogleSignIn} sx={{ width: "100%", mb: 2 }}>
                Conectar con Google
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>Olvidé mi Contraseña</Typography>
        <Typography>
          {" "}
          No tiene una cuenta?
          <Link to="/formularioRegistro" onClick={() => handleChange("event", 1)}>
            Registrarse
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
