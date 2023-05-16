import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  Box,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import mano from "../../image/mano.png";
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useCreateUserMutation } from "../../reduxToolkit/apiSlice";
import { createUserRequest } from "../../reduxToolkit/authentication";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const LogIn2 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isSubmitDisabled = !isValidEmail || !isValidPassword;

  const [crateUser] = useCreateUserMutation();

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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setIsValidEmail(emailRegex.test(value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setIsValidPassword(passwordRegex.test(value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error.message, error.code);
    }
    navigate("/home");
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
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
        console.log(newUser);

        crateUser(newUser);
      }
      navigate("/home");
      Toast.fire({
        icon: "success",
        title: "Inicio de Sesión con Google Exitoso",
      });
    } catch (error: any) {
      console.log("Error signing in with Google:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al vincular cuenta Google..!!",
        confirmButtonColor: "#3085d6",
      });
    }
  };
  return (
    <Grid container sx={{ height: "100vh", justifyContent: "center", alignContent: "center" }}>
      <Grid
        container
        item
        xs={10}
        sm={8}
        md={5}
        sx={{
          backgroundColor: orange[50],
          justifyContent: "center",
          alignContent: "center",
          p: 2,
          borderRadius: "10px ",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={{ width: "100%", mb: 2 }}>
          <Link to="/home">
            <img src={mano} alt="logo" style={{ width: "65px" }} />
          </Link>
        </Box>
        <Card sx={{ width: "90%" }}>
          <Grid item xs={12} sx={{ backgroundColor: "white", p: 2 }}>
            <Typography variant="h4" component="h3" sx={{ mb: 4 }}>
              Ingresar
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={handleEmailFocus}
                  error={!isValidEmail && isEmailFocused}
                  helperText={
                    !isValidEmail && isEmailFocused ? "Tenes que ingresar un email valido" : ""
                  }
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={handlePasswordFocus}
                  error={!isValidPassword && isPasswordFocused}
                  helperText={
                    !isValidPassword && isPasswordFocused
                      ? "la contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial"
                      : ""
                  }
                />
              </FormControl>
              <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Grid item>
                  <FormControlLabel control={<Checkbox />} label="Recordarme" />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    Olvide mi contraseña
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitDisabled}
                fullWidth
                sx={{ mb: 2 }}
              >
                Ingresar
              </Button>
              <Button variant="outlined" fullWidth sx={{ mb: 2 }} onClick={handleGoogleSignIn}>
                Conectar con Google
              </Button>
              <Grid container sx={{}}>
                <Typography variant="body2" align="center" sx={{ width: "60%" }}>
                  No tenes una cuenta?
                </Typography>
                <Link to="/formularioRegistro">
                  <Typography variant="body2" sx={{ marginLeft: "5px", width: "30%" }}>
                    Registrate
                  </Typography>
                </Link>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
