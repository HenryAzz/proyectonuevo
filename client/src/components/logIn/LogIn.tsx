import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const LogIn = ( handleChange ) => {
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
    username: Yup
    .string().required("Required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter valid email"),
    password: Yup.string().required("Password required"),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };
  return (
    <Grid   container 
            direction='column-reverse' 
            alignItems='center' 
            justifyContent='center'
            sx={{ minHeight:'100vh'}}>
      <Paper style={paperStyle}>
        <Grid >
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
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
                label="Username"
                name="username"
                placeholder="Enter username"
                fullWidth
                required
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Sign in"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="/formularioRegistro" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};



// import  React, { FormEvent } from "react";
// import { Button, Container, Grid, Paper, Box, Typography, TextField } from "@mui/material";
// import { Link } from "react-router-dom";
// import LockIcon from '@mui/icons-material/Lock';
// import  InputAdornment from '@mui/material/InputAdornment'
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircle';
// // import logo from '../../image/'
// import styled from "@emotion/styled";

// type LoginType={
//   username:string;
//   password:string; 
// }

// export const LogIn = () => {

//   const [loginData, setLoginData] = React.useState<LoginType>({
//     username:'',
//     password:'',
// })

// const dataLogin =(e: React.ChangeEvent<HTMLInputElement>) => {
//   setLoginData({...loginData, [e.target.name]: e.target.value})
// }

// const handleSubmit = (e: FormEvent<HTMLInputElement>) =>{
//   e.preventDefault();
// }


// const Img = styled("img")({
//   width: 250,
//   height: 50,
//   display: 'flex',
  
// });

//   return (
//      <Container>
//      {/* <Img
//      src={logo}
//      alt='logo'/> */}
//       <Container 
//       maxWidth='md'
//       >
         
//         <Grid 
//         container 
//         direction='column-reverse' 
//         alignItems='center' 
//         justifyContent='center'
//         sx={{ minHeight:'100vh'}}
        
//         >
//           <Grid item>
//           <Paper sx={{padding:'1.2em', borderRadius:'0.5em', backgroundColor:'#ffe0b2' }}>
//             <Typography sx={{mt:1, mb:1}}variant='h4'>Welcome</Typography>
//             <Box component='form' onSubmit={handleSubmit}>
//                <TextField
               
//                InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                      <AccountCircleRoundedIcon/>
//                   </InputAdornment>)}}
//                id="input-with-sx"
//                variant="outlined"
//                name='username'
//                type='email'
//                 margin='normal'
//                 fullWidth
//                 label='Email' 
//                 sx={{mt:2, mb:1.5}} 
//                 required
//                 onChange={dataLogin}/>
                
//                <TextField 
//                 InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockIcon />
//                   </InputAdornment>)}}
//                id="input-with-sx"
//                variant="outlined"
//                name='password'
//                type='password'
//                margin='normal'
//                fullWidth 
//                label='Password' 
//                sx={{mt:1.5, mb:1.5}} 
//                required
//                onChange={dataLogin}
             
//               />
              
//                <Link to="/formulario">
//                <Button fullWidth
//                 type='submit' variant='contained' sx={{mt:1.5, mb:3}}>Sing in</Button>
//                 </Link>
//                 <Link to="/formularioRegistro">
//                <Button fullWidth 
//                 type='submit' variant='contained' sx={{mt:1, mb:1, bgcolor:"#0d47a1"}}>Register</Button>
//                 </Link>
//             </Box>
//           </Paper>
//           </Grid>
//         </Grid>

//       </Container>
//       </Container>
//   )
// };
