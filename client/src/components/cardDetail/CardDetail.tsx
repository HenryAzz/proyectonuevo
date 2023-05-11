import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../../reduxToolkit/apiSlice";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { orange } from "@mui/material/colors";
import Logo from "../../image/logo.png";
import { Carrousel } from "../carrousel/Carrousel";

export const CardDetail = () => {
  const { id } = useParams();
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
              columnSpacing={2}
              direction={{ xs: "column", md: "row" }}
            >
              <Grid item xs={6} sx={{ mr: 1, height: "400px" }}>
                <Carrousel data={data?.pictures} />
              </Grid>
              <Grid
                item
                xs={4.5}
                sx={{
                  bgcolor: colorf,
                  borderRadius: "0.5em",
                  borderColor: "#FFD700",
                  borderStyle: "solid",
                  borderWidth: "4px",
                }}
              >
                <Typography variant="h4">{data?.type}</Typography>
                <Divider sx={{ width: "95%" }} />
                <Typography>{data?.address}</Typography>
                <Typography>$ {data?.price}</Typography>
                <Typography>{data?.description}</Typography>
                <Divider sx={{ width: "95%" }} />
                <Button variant="contained" href="#" sx={{ mt: 1 }}>
                  Hacer Reserva
                </Button>
              </Grid>
            </Grid>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: colorf,
                backgroundColor: "grey",
                justifyContent: "center",
                width: "100vw",
              }}
            >
              <ArrowBackIcon
                fontSize="large"
                sx={{ width: "70px", height: "70px", bgcolor: "#B17A50" }}
              />
            </Link>
          </Box>
        )}
      </Container>
    </Box>
  );
};
