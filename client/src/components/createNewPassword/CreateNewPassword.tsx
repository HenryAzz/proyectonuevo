import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Grid, Typography, TextField, FormControl, Button, Card, Box } from "@mui/material";
import { orange } from "@mui/material/colors";
import mano from "../../image/mano.png";
import { auth } from "../../firebase/firebase";
import { confirmPasswordReset } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateNewPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMachingPassword, setIsMachingPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isSubmitDisabled = !isValidPassword || !isMachingPassword;

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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewPassword(value);
    setIsValidPassword(passwordRegex.test(value));
  };

  const handleMachingPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setConfirmPassword(value);
    let result = value === newPassword && passwordRegex.test(value);
    setIsMachingPassword(result);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const searchParams = new URLSearchParams(location.search);
      const actionCode = searchParams.get("oobCode") as string;
      await confirmPasswordReset(auth, actionCode, newPassword);
      navigate("/login");
      Toast.fire({
        icon: "success",
        title: "Cambio de contraseña exitoso..!!",
      });
    } catch (error: any) {
      console.log(error.message, error.code);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal intentalo nuevamente..!!",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };
  const handleConfirmPasswordFocus = () => {
    setIsConfirmFocused(true);
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
              Ingrese su nueva contraseña
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="ingrese su nueva contraseña"
                  type="password"
                  variant="outlined"
                  value={newPassword}
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
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="confirme su nueva contraseña"
                  type="password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={handleMachingPasswordChange}
                  onFocus={handleConfirmPasswordFocus}
                  error={!isMachingPassword && isConfirmFocused}
                  helperText={
                    !isMachingPassword && isConfirmFocused
                      ? "la contraseña debe conicidir con la ingresada anteriormente"
                      : ""
                  }
                />
              </FormControl>
              <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Grid item></Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitDisabled}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Confimar
                </Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
