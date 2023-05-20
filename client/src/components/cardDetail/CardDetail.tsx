import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../../reduxToolkit/apiSlice";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { orange } from "@mui/material/colors";
import Logo from "../../image/logo.png";
import { Carrousel } from "../carrousel/carrousel";

export const CardDetail = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { data, isLoading } = useGetPropertyByIdQuery(id);
  const colorf = orange[50];

  console.log(data);

  return (
    <Box sx={{ width: "100%", pt: 4, display: "flex", justifyContent: "center" }}>
      <Container maxWidth="xl">
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <img src={Logo} alt="PropTech logo" height="70vh" />
        </Grid>
        {isLoading ? (
          <Typography variant="h4">Cargando...</Typography>
        ) : (
          <Box>
            <Grid
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
              container
              direction={{ xs: "column", md: "row" }}
            >
              <Grid
                item
                xs={8}
                md={9}
                lg={5}
                sx={{
                  mr: { lg: 2 },
                  height: "400px",
                  width: "100%",
                  borderRadius: "0.5em",
                }}
              >
                <Carrousel images={data?.pictures} duration={5} />
              </Grid>
              <Grid
                item
                xs={8}
                md={9}
                lg={5}
                sx={{
                  mt: { xs: 3, sm: 3, md: 3, lg: 0 },
                  padding: 1,
                  bgcolor: colorf,
                  borderRadius: "0.5em",
                  borderColor: "#FFD700",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  height: "400px",
                }}
              >
                <Typography variant="h4">{data?.type}</Typography>
                <Divider sx={{ width: "100%" }} />
                <Box sx={{ height: "75%" }}>
                  <Typography>{data?.address}</Typography>
                  <Typography>$ {data?.price}</Typography>
                  <Typography>Area cubierta: {data?.covered_area} mts</Typography>
                  <Typography>{data?.description}</Typography>
                </Box>
                <Divider sx={{ width: "100%" }} />
                <Link to={`/reserva/${id}`}>
                  <Button variant="contained" sx={{ mt: 1 }}>
                    Hacer Reserva
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                mt: 2,
              }}
            >
              <Link to="/home">
                <Button variant="contained" startIcon={<ArrowBackIcon />}>
                  Volver
                </Button>
              </Link>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
