import { Box, Button, Grid } from "@mui/material";
import logo from "../../image/logo.png";
import { Link } from "react-router-dom";

export const FirstFilters = () => {
  return (
    <Box>
      <header style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="PropTeach Logo"></img>
      </header>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", height: "100vh", justifyContent: "center", alignContent: "center" }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link to="/home">
            <Button variant="contained" sx={{ mb: 2, width: "100%" }}>
              Alquilar
            </Button>
          </Link>
          <Link to="/home">
            <Button variant="contained" sx={{ mb: 2, width: "100%" }}>
              Comprar
            </Button>
          </Link>
          <Button variant="contained" sx={{ mb: 2 }}>
            Vender
          </Button>
          <Button variant="contained" sx={{ mb: 2 }}>
            Tasar
          </Button>
          <Button variant="contained" sx={{ mb: 2 }}>
            Proyectar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
