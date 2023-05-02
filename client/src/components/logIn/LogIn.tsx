import React, { FormEvent } from "react";
import { Button, Container, Grid, Paper, Box, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../image/logo.png";
import styled from "@emotion/styled";

type LoginType = {
  username: string;
  password: string;
};

export const LogIn = () => {
  const [loginData, setLoginData] = React.useState<LoginType>({
    username: "",
    password: "",
  });

  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const Img = styled("img")({
    width: 250,
    height: 50,
    display: "flex",
  });

  return (
    <Container>
      <Img src={logo} alt="logo" />
      <Container maxWidth="md">
        <Grid
          container
          direction="column-reverse"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", backgroundColor: "#ffe0b2" }}>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
                Welcome
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                  id="input-with-sx"
                  variant="outlined"
                  name="username"
                  type="email"
                  margin="normal"
                  fullWidth
                  label="Email"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataLogin}
                />

                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  id="input-with-sx"
                  variant="outlined"
                  name="password"
                  type="password"
                  margin="normal"
                  fullWidth
                  label="Password"
                  sx={{ mt: 1.5, mb: 1.5 }}
                  required
                  onChange={dataLogin}
                />

                <Link to="/formulario">
                  <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>
                    Sing in
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};
