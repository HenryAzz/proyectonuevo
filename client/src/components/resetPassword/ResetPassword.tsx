import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { orange } from "@mui/material/colors";
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
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
  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Toast.fire({
        icon: "success",
        title:
          "Se envió un email para que pueda recuperar su contraseña por favor revise su casilla de correo",
      });
      // Reset email sent successfully, wait for user to reset password
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Surgió un error al intentar enviar el email de recupero de contraseña por favor inténtelo nuevamente",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignContent: "flex-start",
        mt: 3,
      }}
    >
      <Grid
        item
        xs={5}
        sx={{
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
          p: 2,
          display: "flex",
          alignContent: "center",
          backgroundColor: orange[50],
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h4" component="h3" sx={{ mb: 2, alignSelf: "flex-start" }}>
            Recuperar contraseña
          </Typography>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            onFocus={handleEmailFocus}
            error={!isValidEmail && isEmailFocused}
            helperText={!isValidEmail && isEmailFocused ? "Tenes que ingresar un email valido" : ""}
            sx={{ mb: 2, width: "80%", alignSelf: "center" }}
          />
          <Button
            variant="contained"
            onClick={handlePasswordReset}
            sx={{ mb: 2, width: "80%", alignSelf: "center" }}
          >
            Reset Password
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
