import { Button, Grid } from "@mui/material";

export const SecondFilters = () => {
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
        <Button variant="contained" sx={{ m: 2 }} href="#">
          Vivienda
        </Button>
        <Button variant="contained" sx={{ m: 2 }}>
          Oficina
        </Button>
        <Button variant="contained" sx={{ m: 2 }}>
          Local
        </Button>
        <Button variant="contained" sx={{ m: 2 }}>
          Industria
        </Button>
      </Grid>
    </Grid>
  );
};
