import { Box, Container, Typography, Grid, CardActions, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../../reduxToolkit/apiSlice";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { orange } from "@mui/material/colors";

export const CardDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPropertyByIdQuery(id);
  const colorf = orange[50];

  console.log(data);

  return (
    <Box sx={{ width: "100%", mt: 10 }}>
      <Container maxWidth="xl">
        <ArrowBackIcon />
        {isLoading ? (
          <Typography variant="h4">Cargando...</Typography>
        ) : (
          <Grid
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            container
            columnSpacing={2}
          >
            <Grid item xs={5.5} sx={{ mr: 0.5 }}>
              <img src={data!.pictures[0].img} style={{ width: "100%", borderRadius: "0.5em" }} />
            </Grid>
            <Grid item xs={5.5} sx={{ bgcolor: colorf, borderRadius: "0.5em" }}>
              <Typography variant="h3">{data!.type}</Typography>
              <Divider sx={{ width: "95%" }} />
              <Typography>{data?.address}</Typography>
              <Typography>$ {data?.price}</Typography>
              <Typography>{data.description}</Typography>
              <Divider sx={{ width: "95%" }} />
              <Button variant="contained" href="#" sx={{ mt: 1 }}>
                Hacer Reserva
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};
