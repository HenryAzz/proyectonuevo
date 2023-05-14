/* import { Box, Button, Grid } from "@mui/material";
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
              id="alquiler"
              variant="contained"
              sx={{ mb: 2, width: "100%" }}
              onClick={handlerClick}
            >
              Alquilar
            </Button>
          </Link>
          <Link to="/home">
            <Button
              id="venta"
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
}; */
//

import { Box, Button, Grid, Container } from "@mui/material";
import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
import casaA from "../../image/casa1.jpg";
import proyectar from "../../image/estadistica.jpg";
import casaV from "../../image/casa2.jpg";
import plano from "../../image/plano1.jpg";
import { orange } from "@mui/material/colors";

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
  const colorf = orange[50];
  const handlerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setMissingFilters(true);
    if (event.target instanceof HTMLButtonElement) {
      setStringQuery(stringQuery + `operation=${event.target.id}`);
    }
  };
  return (
    <Container>
      <Box>
        <img src={logo} alt="PropTeach Logo" width="250px" height="50px" />
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3, mt: 2 }}>
          <Grid>
            <Container
              sx={{
                bgcolor: colorf,
                height: "400",
                width: "400",
              }}
            >
              <br />
              <img src={casaA} alt="casa alquiler" width="300px" height="300px" />
              <br />
              <Link to="/home">
                <Button
                  id="alquiler"
                  variant="outlined"
                  sx={{ mb: 2, width: "200px", ml: "50px", border: 3, color: "#A0522D" }}
                  onClick={handlerClick}
                >
                  Alquilar
                </Button>
              </Link>
            </Container>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Container
              sx={{
                bgcolor: colorf,
                height: "400",
                width: "400",
              }}
            >
              <br />
              <img src={casaV} alt="casa venta" width="300px" height="300px" />
              <br />
              <Link to="/home">
                <Button
                  id="venta"
                  variant="outlined"
                  sx={{ mb: 2, width: "200px", ml: "50px", border: 3, color: "#A0522D" }}
                  onClick={handlerClick}
                >
                  Comprar
                </Button>
              </Link>
            </Container>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Container
              sx={{
                bgcolor: colorf,
                height: "400",
                width: "400",
              }}
            >
              <br />
              <img src={plano} alt="plano" width="300px" height="300px" />
              <br />
              <Link to="/form">
                <Button
                  variant="outlined"
                  sx={{ mb: 2, width: "200px", ml: "50px", border: 3, color: "#A0522D" }}
                >
                  Operaciones
                </Button>
              </Link>
            </Container>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Container
              sx={{
                bgcolor: colorf,
                height: "400",
                width: "400",
              }}
            >
              <br />
              <img src={proyectar} alt="proyectar" width="300px" height="300px" />
              <br />
              <Button
                variant="outlined"
                sx={{ mb: 2, width: "200px", ml: "50px", border: 3, color: "#A0522D" }}
              >
                Proyectar
              </Button>
            </Container>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
//
