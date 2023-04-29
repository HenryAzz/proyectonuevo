import { Button, Grid /* , useTheme, useMediaQuery */ } from "@mui/material";

export const FirstFilters = () => {
  //const theme = useTheme();
  //const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
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
        <Button variant="contained" sx={{ mb: 2 }}>
          Alquilar
        </Button>
        <Button variant="contained" sx={{ mb: 2 }}>
          Comprar
        </Button>
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
  );
};
