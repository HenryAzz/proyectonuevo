import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";
export const Registro = () => {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };
  const initialValues = {
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string()
      .required("Required")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter valid email"),
    gender: Yup.string().oneOf(["male", "female"], "Required").required("Required"),
    phoneNumber: Yup.number().typeError("Enter valid Phone Number").required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required")
      .matches(
        /^(?=.\d)(?=.[\u0021-\u002b\u003c-\u0040])(?=.[A-Z])(?=.[a-z])\S{8,16}$/,
        "Password must contain at least one uppercase letter, one number and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
    termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions"),
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
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Register</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
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
                label="Name"
                placeholder="Enter your name"
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                placeholder="Enter your email"
                helperText={<ErrorMessage name="email" />}
              />
              <FormControl component="fieldset" style={marginTop}>
                <FormLabel component="legend">Gender</FormLabel>
                <Field
                  as={RadioGroup}
                  aria-label="gender"
                  name="gender"
                  style={{ display: "initial" }}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </Field>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="gender" />
              </FormHelperText>
              <Field
                as={TextField}
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                helperText={<ErrorMessage name="phoneNumber" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <FormControlLabel
                control={<Field as={Checkbox} name="termsAndConditions" />}
                label="I accept the terms and conditions."
              />
              <FormHelperText>
                <ErrorMessage name="termsAndConditions" />
              </FormHelperText>
              <Link to="/logIN">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={props.isSubmitting}
                  color="primary"
                >
                  {props.isSubmitting ? "Loading" : "Sign up"}
                </Button>
              </Link>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

// import  React, { FormEvent } from "react";
// import { Container, Grid, Paper, Box, Typography, TextField, Button } from '@mui/material'
// import { Link } from "react-router-dom";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

// type Register={
//     username:string;
//     password:string;
//   }

// export const Registro = () => {

//     const [registerData, setRegisterData] = React.useState<Register>({
//         username:'',
//         password:'',
//     })

//     const dataLogin =(e: React.ChangeEvent<HTMLInputElement>) => {
//     setRegisterData({...registerData, [e.target.name]: e.target.value})
//     }

//     const handleSubmit = (e: FormEvent<HTMLInputElement>) =>{
//       e.preventDefault();
//     }

//     return(
//         <Container>
//           <Grid
//         container
//         direction='column-reverse'
//         alignItems='center'
//         justifyContent='center'
//         sx={{ minHeight:'100vh'}}

//         >
//           <Grid item>
//           <Paper sx={{padding:'1.2em', borderRadius:'0.5em', backgroundColor:'#ffe0b2' }}>
//             <Typography sx={{mt:1, mb:1}}variant='h4'>Register</Typography>
//             <Box component='form' onSubmit={handleSubmit}>
//                <TextField
//                id="input-with-sx"
//                variant="outlined"
//                name='name'
//                type='name'
//                 margin='normal'
//                 fullWidth
//                 label='Name'
//                 sx={{mt:2, mb:1.5}}
//                 required
//                 onChange={dataLogin}/>

//                 <TextField
//                 id="input-with-sx"
//                 variant="outlined"
//                 name='username'
//                 type='username'
//                 margin='normal'
//                 fullWidth
//                 label='Username'
//                 sx={{mt:1.5, mb:1.5}}
//                 required
//                 onChange={dataLogin}
//                />

//                <TextField
//                id="input-with-sx"
//                variant="outlined"
//                name='email'
//                type='email'
//                margin='normal'
//                fullWidth
//                label='Email Addres'
//                sx={{mt:1.5, mb:1.5}}
//                required
//                onChange={dataLogin}
//               />

//                 <TextField
//                 id="input-with-sx"
//                 variant="outlined"
//                 name='confirmEmail'
//                 type='email'
//                 margin='normal'
//                 fullWidth
//                 label='Confirm Email Addres'
//                 sx={{mt:1.5, mb:1.5}}
//                 required
//                 onChange={dataLogin}
//                />

//                <TextField
//                 id="input-with-sx"
//                 variant="outlined"
//                 name='password'
//                 type='password'
//                 margin='normal'
//                 fullWidth
//                 label='Password'
//                 sx={{mt:1.5, mb:1.5}}
//                 required
//                 onChange={dataLogin}
//                />

//                 <TextField
//                 id="input-with-sx"
//                 variant="outlined"
//                 name='confirmpassword'
//                 type='password'
//                 margin='normal'
//                 fullWidth
//                 label='Confirm Password'
//                 sx={{mt:1.5, mb:1.5}}
//                 required
//                 onChange={dataLogin}
//                />
//                <FormControlLabel required control={<Checkbox />} label="Acepto terminos y condiciones" />
//                <Link to="/logIn">
//                <Button fullWidth
//                 type='submit' variant='contained' sx={{mt:1, mb:1, bgcolor:"#0d47a1"}}>Register</Button>
//                 </Link>
//             </Box>
//           </Paper>
//           </Grid>
//         </Grid>
//         </Container>
//     )
// }
