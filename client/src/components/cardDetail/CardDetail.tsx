import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { useParams } from "react-router-dom";
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
                <Carrousel images={data?.pictures} />
              </Grid>
              <Grid
                item
                xs={8}
                md={9}
                lg={5}
                sx={{
                  mt: { sm: 1, md: 0 },
                  padding: 1,
                  bgcolor: colorf,
                  borderRadius: "0.5em",
                  borderColor: "#FFD700",
                  borderStyle: "solid",
                  borderWidth: "2px",
                }}
              >
                <Typography variant="h4">{data?.type}</Typography>
                <Divider sx={{ width: "95%" }} />
                <Typography>{data?.address}</Typography>
                <Typography>$ {data?.price}</Typography>
                <Typography paragraph={true}>{data?.description}</Typography>
                <Divider sx={{ width: "95%" }} />
                <Button variant="contained" href="#" sx={{ mt: 1 }}>
                  Hacer Reserva
                </Button>
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
              <Button variant="contained" startIcon={<ArrowBackIcon />} href="/home">
                Volver
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
