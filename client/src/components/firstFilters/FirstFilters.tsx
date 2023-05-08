import { Box, Button, Grid } from "@mui/material";
import logo from "../../image/logo.png";
import { Link } from "react-router-dom";

type ChildComponentProps = {
  setMissingFilters: React.Dispatch<React.SetStateAction<boolean>>;
  setStringQuery: React.Dispatch<React.SetStateAction<string>>;
  stringQuery: string;
};

export const FirstFilters: React.FC<ChildComponentProps> = ({
  setMissingFilters,
  setStringQuery,
  stringQuery,
}) => {
  const handlerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setMissingFilters(true);
    if (event.target instanceof HTMLButtonElement) {
      setStringQuery(stringQuery + `operation=${event.target.id}`);
    }
  };

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
            <Button
              id="Alquiler"
              variant="contained"
              sx={{ mb: 2, width: "100%" }}
              onClick={handlerClick}
            >
              Alquilar
            </Button>
          </Link>
          <Link to="/home">
            <Button
              id="Venta"
              variant="contained"
              sx={{ mb: 2, width: "100%" }}
              onClick={handlerClick}
            >
              Comprar
            </Button>
          </Link>
          <Link to="/formVenta">
            <Button variant="contained" sx={{ mb: 2, width: "100%" }}>
              Vender
            </Button>
          </Link>
          <Link to="/formTasar">
            <Button variant="contained" sx={{ mb: 2, width: "100%" }}>
              Tasar
            </Button>
          </Link>
          <Button variant="contained" sx={{ mb: 2 }}>
            Proyectar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
//
